const { createServer } = require('http')
const { Observable, Subject, of, throwError } = require('rxjs')
const { mergeAll, catchError, map, multicast } = require('rxjs/operators')

const { send, sendError, createError } = require('micro')

const createServerObservable = onCreate =>
  new Observable(observer => {
    try {
      const server = createServer((req, res) => observer.next({ req, res }))
      server.on('close', () => observer.complete())
      onCreate(server)
    } catch (err) {
      observer.error(err)
    }
  })

const mapToObservable = f => {
  try {
    const result = f()
    if (!(result instanceof Observable)) {
      return of(result)
    }
    return result
  } catch (err) {
    return throwError(err)
  }
}

const createTupleObservable = (...args) =>
  new Observable(observer => {
    observer.next(args)
    observer.complete()
  })

const run = (handler, request$$) =>
  request$$.pipe(
    map(({ req, res }) =>
      mapToObservable(() => handler(req, res, of(undefined))).pipe(
        map(val => [{ req, res }, null, val]),
        catchError(err => createTupleObservable({ req, res }, err, null))
      )
    ),
    mergeAll(),
    multicast(() => new Subject())
  )

const serve = (handler, onCreate) => {
  const request$ = run(handler, createServerObservable(onCreate))

  request$.connect()
  request$.subscribe(([{ req, res }, err, val]) => {
    if (err) {
      if (err.statusCode) {
        sendError(req, res, err)
      } else {
        sendError(req, res, createError(500, err.message, err))
      }
    } else {
      send(res, res.statusCode, val)
    }
  })

  return request$
}

module.exports = serve

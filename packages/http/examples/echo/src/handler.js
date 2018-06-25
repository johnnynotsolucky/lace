const { createError } = require('../../../')
const { from, pipe } = require('rxjs')
const { tap, mergeMap } = require('rxjs/operators')
const getBody = require('raw-body')

throwIfNotPost = ({ req }) => {
  if (req.method !== 'POST') {
    throw createError(400, 'Soz')
  }
}

parseBody = ({ req }) => from(getBody(req, { encoding: true }))

module.exports = pipe(
  tap(throwIfNotPost),
  mergeMap(parseBody),
)

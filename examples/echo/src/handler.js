const { createError } = require('../../../')
const { from } = require('rxjs')
const { tap, map, mergeAll } = require('rxjs/operators')
const getBody = require('raw-body')

throwIfNotPost = ({ req }) => {
  if (req.method !== 'POST') {
    throw createError(400, 'Soz')
  }
}

parseBody = ({ req }) => from(getBody(req, { encoding: true }))

module.exports = request$ =>
  request$.pipe(
    tap(throwIfNotPost),
    map(parseBody),
    mergeAll(),
  )

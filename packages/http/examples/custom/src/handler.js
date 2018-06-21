const { send } = require('../../../')

module.exports = () => send({ foo: 'bar' }, 200, { 'x-foo': 'bar' })

const create = require('../../../')
const userMiddleware = require('./handler')

const start = create(userMiddleware)
start(3000, server => {
  const { address, port } = server.address()
  console.log(`Server listening on ${address}:${port}`)
})

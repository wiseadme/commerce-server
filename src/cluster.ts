import cluster from 'cluster'
import { server } from './server'
import consola from 'consola'

const cCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < cCPUs; i++) {
    cluster.fork()
  }
  cluster.on('online', (worker) => {
    consola.success('Worker ' + worker.process.pid + ' is online.')
  })
  cluster.on('exit', (worker, code, signal) => {
    consola.info('worker ' + worker.process.pid + ' died.')
  })
} else {
  (server as any).listen()
}

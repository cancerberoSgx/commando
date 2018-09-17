
const PQueue = require('p-queue');
import { exec as execImpl } from 'shelljs'
import { Cmd, Config, Result } from '.';

export class Commando {
  private queue: any

  constructor(protected config: Config) {
    this.queue = new PQueue(config)
  }

  exec(cmd: Cmd | string): Promise<Result> {
    return this.queue.add(() => new Promise(resolve => {
      execImpl(typeof cmd === 'string' ? cmd : cmd.value, { async: true }, () => {
        resolve(arguments)
      })
    }))
  }

  // buildPromise(cmd: Cmd | string): Promise<Result> {
  //   //TODO: util.promisify
  //   return new Promise(resolve => {
  //     execImpl(typeof cmd === 'string' ? cmd : cmd.value, { async: true }, () => {
  //       resolve(arguments)
  //     })
  //   })
  // }
}

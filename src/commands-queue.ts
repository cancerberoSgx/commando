
// const PQueue = require('p-queue');
import PQueue from 'p-queue'

import { exec as execImpl, config as shellConfig } from 'shelljs'
import { Cmd, Config, Result } from '.';

export class CommandsQueue {
  private queue: any

  constructor(protected config: Config) {
    this.queue = new PQueue(config)
    Object.assign(shellConfig, config.shellConfig || {})
  }

  exec(command: Cmd | string): Promise<Result> {
    return this.queue.add(() => new Promise(resolve => {
      const cmd: Cmd = typeof command === 'string' ? { value: command } : command
      Object.assign(shellConfig, cmd.shellConfig || {})
      const value = cmd.value
      const execOptions = Object.assign({}, cmd.execOptions || {}, { async: true })
      const process = execImpl(value, execOptions, (code: number, stdout: string, stderr: string) => {
        const result: Result = {
          code,
          stdout,
          stderr,
          cmd: typeof cmd === 'string' ? { value: cmd } : cmd,
          process
        }
        resolve(result)
      })
    }))
  }

}

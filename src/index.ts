export class Config {
  concurrency: number
}
export class Result {

}
export class Cmd {
  value: string
}
import { exec as execImpl } from 'shelljs'

export class Commando {
  constructor(protected config: Config) {

  }
  exec(cmd: Cmd | string): Promise<Result> {
    return new Promise(resolve => {
      execImpl(typeof cmd === 'string' ? cmd : cmd.value, { async: true }, () => {
        resolve(arguments)
      })
    })
  } //TODO: util.promisify
}

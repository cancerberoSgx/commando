import { ShellConfig, ShellReturnValue, ExecOptions } from 'shelljs';
import { ChildProcess } from 'child_process';

export class Config {
  /** number of commands being executed concurrently. Default is 1 which means commands will be executed serially 1 by 1*/
  concurrency?: number = 1

  shellConfig?: Partial<ShellConfig>
}

export class Result {
  process: ChildProcess
  code: number
  stdout: string
  stderr: string
  cmd: Cmd
}

export class Cmd {
  value: string
  execOptions?: Partial<ExecOptions>
  shellConfig?: Partial<ShellConfig>
}

export * from './commands-queue'
import { ShellConfig, ShellReturnValue, ExecOptions } from 'shelljs';
import { ChildProcess } from 'child_process';

import PQueue from 'p-queue'

export interface Config extends PQueue.Options<any> {
  // /** number of commands being executed concurrently. Default is 1 which means commands will be executed serially 1 by 1*/
  // concurrency?: number

  shellConfig?: Partial<ShellConfig>
}

export interface Result {
  process: ChildProcess
  code: number
  stdout: string
  stderr: string
  cmd: Cmd
}

export interface Cmd {
  value: string
  execOptions?: Partial<ExecOptions>
  shellConfig?: Partial<ShellConfig>
}

export * from './commands-queue'
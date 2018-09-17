import PQueue from 'p-queue'

import { exec as execImpl, config as shellConfig } from 'shelljs'
import { Cmd, Config, Result } from '.';

export class CommandsQueue {
  private queue: PQueue

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

  /**
   * Adds a sync or async task to the queue. Always returns a promise.
   * @param fn Promise-returning/async function.
   * @param options 
   */
  add<T>(fn: PQueue.Task<T>, options?: PQueue.QueueAddOptions): Promise<T> {
    return this.queue.add(fn, options)
  }
  /**
  * Same as .add(), but accepts an array of sync or async functions and returns a promise that resolves when
  * all functions are resolved.
  */
  addAll<T>(fns: PQueue.Task<T>[], options?: PQueue.QueueAddOptions): Promise<T> {
    return this.queue.add(fns, options)
  }
  pause(): void {
    this.queue.pause()
  }
  start(): void {
    this.queue.start()
  }
  clear(): void {
    this.queue.start()
  }
  /**
   * Returns a promise that settles when the queue becomes empty.
   *
   * Can be called multiple times. Useful if you for example add additional items at a later time.
   */
  onEmpty(): Promise<void> {
    return this.queue.onEmpty()
  }
  /**
   * Returns a promise that settles when the queue becomes empty, and all promises have completed; queue.size
   * === 0 && queue.pending === 0.
   *
   * The difference with .onEmpty is that .onIdle guarantees that all work from the queue has finished.
   * .onEmpty merely signals that the queue is empty, but it could mean that some promises haven't completed
   * yet.
   */
  onIdle(): Promise<void> {
    return this.queue.onIdle()
  }
  get size(): number {
    return this.queue.size
  }
  get pending(): number {
    return this.queue.pending
  }
  get isPaused(): boolean {
    return this.queue.isPaused
  }
}

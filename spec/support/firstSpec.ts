import { CommandsQueue } from '../../src';
import { test, cat, rm } from 'shelljs';

describe('commander', () => {
  let counter = 0
  beforeEach(() => {
    rm('-f', 'tmp*.*')
    expect(test('-f', 'tmp.txt')).toBeFalsy()
    counter = 0
  })
  afterEach(() => {
    rm('-f', 'tmp*.*')
  })


  it('result', async done => {
    const cmd = new CommandsQueue({
      concurrency: 1,
      shellConfig: {
        silent: true
      }
    })
    let result = await cmd.exec({ value: 'echo "hello"', execOptions: { cwd: '.' }, shellConfig: { silent: true } })
    expect(result.code).toBe(0)
    expect(result.stdout).toBe('hello\n')
    expect(result.stderr).toBe('')
    done()
  })

  it('concurrency: 1', async done => {
    const cmd = new CommandsQueue({
      concurrency: 1
    })
    expect(test('-f', 'tmp.txt')).toBeFalsy()

    cmd.exec('sleep 0.1 && echo "hello" > tmp.txt').then(() => { counter++ })
    cmd.exec('sleep 0.1 && echo "hello2" > tmp2.txt').then(() => { counter++ })

    await sleep(120)
    expect(cat('tmp.txt').toString()).toBe('hello\n')
    expect(counter).toBe(1)
    expect(test('-f', 'tmp2.txt')).toBeFalsy()

    await sleep(120)
    expect(cat('tmp2.txt').toString()).toBe('hello2\n')
    expect(counter).toBe(2)

    done()
  })
  it('concurrency: 2', async done => {

    const cmd = new CommandsQueue({
      concurrency: 2
    })

    expect(test('-f', 'tmp.txt')).toBeFalsy()
    expect(test('-f', 'tmp2.txt')).toBeFalsy()

    cmd.exec('sleep 0.1 && echo "hello" > tmp.txt').then(() => { counter++ })
    cmd.exec('sleep 0.1 && echo "hello2" > tmp2.txt').then(() => { counter++ })

    await sleep(120)
    expect(counter).toBe(2)

    expect(cat('tmp.txt').toString()).toBe('hello\n')
    expect(cat('tmp2.txt').toString()).toBe('hello2\n')

    done()
  })
})

function sleep(ms: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
import { CommandsQueue } from '../../src';
import { test, cat, rm } from 'shelljs';

describe('commander', () => {
  beforeEach(() => {
    rm('-f', 'tmp*.*')
    expect(test('-f', 'tmp.txt')).toBeFalsy()
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

    cmd.exec('sleep 0.2 && echo "hello" > tmp.txt')
    cmd.exec('sleep 0.2 && echo "hello2" > tmp2.txt')

    await sleep(250)
    expect(cat('tmp.txt').toString()).toBe('hello\n')
    expect(test('-f', 'tmp2.txt')).toBeFalsy()

    await sleep(250)
    expect(cat('tmp2.txt').toString()).toBe('hello2\n')

    done()
  })
  it('concurrency: 2', async done => {

    const cmd = new CommandsQueue({
      concurrency: 2
    })

    expect(test('-f', 'tmp.txt')).toBeFalsy()
    expect(test('-f', 'tmp2.txt')).toBeFalsy()

    cmd.exec('sleep 0.2 && echo "hello" > tmp.txt')
    cmd.exec('sleep 0.2 && echo "hello2" > tmp2.txt')

    await sleep(250)

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
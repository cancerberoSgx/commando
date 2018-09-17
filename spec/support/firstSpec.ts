import { Commando } from '../../src';
import { test, cat, rm } from 'shelljs';

describe('commander', () => {
  it('1', async done => {

    rm('-f', 'tmp*.*')
    const cmd = new Commando({
      concurrency: 1
    })
    expect(test('-f', 'tmp.txt')).toBeFalsy()

    await cmd.exec('sleep 0.7 && echo "hello" > tmp.txt')
    expect(cat('tmp.txt').toString()).toBe('hello\n')
    expect(test('-f', 'tmp2.txt')).toBeFalsy()
    await cmd.exec('sleep 0.7 && echo "hello2.txt">tmp2.txt')

    expect(test('-f', 'tmp.txt')).toBeTruthy()

    rm('-f', 'tmp*.*')
    done()
  })
})
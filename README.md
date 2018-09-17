# commands-queue

**execute command line in a synchronized fashion**

 * concurrently
 * in a concurrent sized queue
 * serially

```sh
npm install --save commands-queue
```

The following example execute all given commands in a concurrent queue of size 2:

```js
const CommandQueue = require('commands-queue')
const queue = new CommandQueue({concurrency: 2})
queue.exec('cd project1 && npm install && npm run build && npm test')
queue.exec('cd project2 && npm install && npm run build && npm test')
queue.exec('cd project3 && npm install && npm run build && npm test').then(result=>console.log('echo "almost there", exit code: '+result.code))
queue.exec('cd project4 && npm install && npm run build && npm test')
```

Or similar to above but this time registering all the commands first and then start executing them programmatically:

(TODO)


```js
const CommandQueue = require('commands-queue')
const queue = new CommandQueue({concurrency: 2, autoStart: false})
queue.exec('cd project1 && npm install && npm run build && npm test')
queue.exec('cd project2 && npm install && npm run build && npm test')
queue.exec('cd project3 && npm install && npm run build && npm test').then(console.log('echo "almost there"'))
queue.exec('cd project4 && npm install && npm run build && npm test')
queue.onIdle().then(()=>console.log('ALL WORK DONE'))
const results = await queue.start()
```

# Documentation

[API docs](https://cancerberosgx.github.io/commands-queue/index.html)
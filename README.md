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
const tool = new CommandQueue({concurrency: 2})
commando.exec('cd project1 && npm install && npm run build && npm test')
commando.exec('cd project2 && npm install && npm run build && npm test')
commando.exec('cd project3 && npm install && npm run build && npm test')
commando.exec('cd project4 && npm install && npm run build && npm test').then('echo "finish"')
```
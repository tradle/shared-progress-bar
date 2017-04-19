# @tradle/shared-progress-bar

for when you need a single progress bar for multiple concurrent tasks, and you don't want to trigger epilepsy in your users

## Usage

### How it works 

- progress goes from 0 to 1
- push events into the bar with `bar.progress({ task, progress })`
- get 'progress' events out

It's first come first serve: if there are concurrent tasks, the first task to grab the bar will monopolize 'progress' events it until it's done. Then the next task will grab the bar, unless it already finished, in which case its beautiful journey from 0 to 1 will be lost forever. Is that the saddest thing you've ever heard or what?

### Example

```js
const createBar = require('@tradle/shared-progress-bar')
const bar = createBar()
bar.on('progress', function ({ task, progress }) {
  // render your bar
  console.log(task, progress)
  // a 0.1
  // a 0.2
  // a 1
  // b 0.8
})

// push progress data
bar.progress({
  task: 'a',
  progress: 0.1
})

bar.progress({
  task: 'b',
  progress: 0.5
})

bar.progress({
  task: 'a',
  progress: 0.2
})

bar.progress({
  task: 'b',
  progress: 0.8
})

bar.progress({
  task: 'a',
  progress: 1
})
```

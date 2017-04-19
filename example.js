const createBar = require('./')
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

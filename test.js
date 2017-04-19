const test = require('tape')
const createBar = require('./')

test('basic', function (t) {
  const bar = createBar()
  const queue = [
    { task: 'a', progress: 0.1 },
    // deferred
    { task: 'b', progress: 0.2 },
    // deferred (later dropped)
    { task: 'c', progress: 0.1 },
    { task: 'a', progress: 0.3 },
    // deferred
    { task: 'b', progress: 0.4 },
    // dropped, as it finishes before 'a' finishes
    { task: 'c', progress: 1 },
    { task: 'a', progress: 1 },
    { task: 'b', progress: 0.5 },
    // deferred
    { task: 'a', progress: 0.2 },
    { task: 'b', progress: 1 }
  ]

  const expected = [
    { task: 'a', progress: 0.1 },
    { task: 'a', progress: 0.3 },
    { task: 'a', progress: 1 },
    { task: 'b', progress: 0.4 },
    { task: 'b', progress: 0.5 },
    { task: 'b', progress: 1 },
    { task: 'a', progress: 0.2 }
  ]

  t.plan(expected.length)
  bar.on('progress', item => {
    t.same(item, expected.shift())
  })

  queue.forEach(item => bar.progress(item))
})

const { EventEmitter } = require('events')
const clone = require('xtend')

module.exports = function createSharedProgressBar () {
  const emitter = new EventEmitter()
  const running = []
  emitter.progress = function (event) {
    const { task, progress } = event
    if (!running.length) {
      running.push(event)
      emitter.emit('progress', event)
      return
    }

    const match = running.find(item => item.task === task)
    if (!match) {
      running.push({ task, progress })
      return
    }

    match.progress = progress

    const current = running[0]
    if (match === current) {
      emitter.emit('progress', current)
      if (progress !== 1) return

      running.shift()

      if (!running.length) return

      // artificially trigger next
      return emitter.progress(clone(event, running[0]))
    }

    if (progress === 1) {
      // silently remove finished task
      running.splice(running.indexOf(match), 1)
    }
  }

  return emitter
}

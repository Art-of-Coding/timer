'use strict'

export default function createTimer (ms: number, ...listeners: (() => void)[]): Timer {
  return new Timer(ms, ...listeners)
}

export class Timer {
  private fired = false
  private ms: number
  private timeout: NodeJS.Timeout
  private listeners: Set<() => void> = new Set()

  public constructor (ms: number, ...listeners: (() => void)[]) {
    this.ms = ms

    if (listeners.length) {
      this.once(...listeners)
    }

    this.setTimeout(this.ms)
  }

  public once (...listeners: (() => void)[]): this {
    listeners.forEach(listener => {
      this.listeners.add(listener)
    })

    return this
  }

  public removeListener (listener: () => void): this {
    this.listeners.delete(listener)

    return this
  }

  public removeAllListeners () {
    this.listeners.clear()
  }

  public cancel (): this {
    if (!this.fired) {
      clearTimeout(this.timeout)
      this.timeout = null
    }

    return this
  }

  public reset (ms?: number): this {
    ms = ms || this.ms

    this.cancel()
    this.setTimeout(ms)

    return this
  }

  private setTimeout (ms: number) {
    this.fired = false
    this.timeout = setTimeout(() => {
      this.fired = true
      this.timeout = null
      this.listeners.forEach(listener => listener())
    }, ms)
  }
}

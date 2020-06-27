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
      this.on(...listeners)
    }

    this.setTimeout(this.ms)
  }

  public on (...listeners: (() => void)[]): this {
    listeners.forEach(listener => {
      this.listeners.add(listener)
    })

    return this
  }

  public once (...listeners: (() => void)[]): this {
    listeners.forEach(listener => {
      const wrappedListener = () => {
        this.removeListener(wrappedListener)
        listener()
      }

      this.listeners.add(wrappedListener)
    })

    return this
  }

  public removeListener (listener: () => void): this {
    this.listeners.delete(listener)

    return this
  }

  public removeAllListeners (): this {
    this.listeners.clear()

    return this
  }

  public cancel (): this {
    if (!this.fired) {
      clearTimeout(this.timeout)
      this.timeout = null
    }

    return this
  }

  public reset (ms?: number): this {
    this.cancel()
    this.setTimeout(ms || this.ms)

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

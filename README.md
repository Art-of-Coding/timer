# @Art-of-Coding/timer

A simple cancellable timer.
No dependencies and uses `setTimeout` under the hood.

## Install

```
npm i @art-of-coding/timer
```

## Example

```ts
import createTimer from '@art-of-coding/timer'

// create a timer for 60 seconds from now
const timer = createTimer(60 * 1000)

// add a listener
timer.on(() => {
  console.log('Timer fired')
})

// cancel the timer
timer.cancel()

// reset the timer and set for 50 seconds
timer.reset(50 * 1000)
```

## License

Copyright 2020 Art of Coding.

This software is licensed under [the MIT License](LICENSE).

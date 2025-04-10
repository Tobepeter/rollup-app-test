import format from 'date-fns/format'
import { test } from './test'

const span = document.querySelector('#time-now')

export function update(): void {
  // span.textContent = format(new Date(), 'h:mm:ssa')
  span.textContent = test.str
  // span.textContent = IS_DEV ? 'dev' : 'prod'
  setTimeout(update, 1000)
}

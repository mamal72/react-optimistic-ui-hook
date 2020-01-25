/* tslint:disable:no-expression-statement */
import test from 'ava'
import { renderHook } from '@testing-library/react-hooks'

import { useOptimisticUI } from './hook'

const predictedValue = 10
const resultValue = 9
const errorValue = new Error('something went wrong')

test('returns predicted state initially', t => {
  const { result } = renderHook(() =>
    useOptimisticUI<number>(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve(resultValue), 2000)
        }),
      predictedValue
    )
  )

  t.deepEqual(result.current, {
    result: predictedValue,
    status: 'loading'
  })
})

test('returns correct state on succeed', t => {
  const { result } = renderHook(() =>
    useOptimisticUI<number>(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve(resultValue), 200)
        }),
      predictedValue
    )
  )

  return new Promise(resolve => {
    setTimeout(() => {
      t.deepEqual(result.current, {
        result: resultValue,
        status: 'succeed'
      })
      resolve()
    }, 1000)
  })
})

test('returns correct state on error', t => {
  const { result } = renderHook(() =>
    useOptimisticUI<number>(
      () =>
        new Promise((_resolve, reject) => {
          setTimeout(() => reject(errorValue), 200)
        }),
      predictedValue
    )
  )

  return new Promise(resolve => {
    setTimeout(() => {
      t.deepEqual(result.current, {
        result: predictedValue,
        error: errorValue,
        status: 'failed'
      })
      resolve()
    }, 1000)
  })
})

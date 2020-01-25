import { useState, useEffect } from 'react'

interface OptimisticUIState<T> {
  readonly status: 'pending' | 'loading' | 'failed' | 'succeed'
  readonly result?: T
  readonly error?: Error
}

export function useOptimisticUI<T>(
  func: (...args: readonly any[]) => Promise<T>,
  predictedResult: T
): OptimisticUIState<T> {
  const [optimisticUIState, setOptimisticUIState] = useState<
    OptimisticUIState<T>
  >({
    status: 'pending',
    result: predictedResult
  })

  useEffect(() => {
    async function invokeFunction(): Promise<void> {
      setOptimisticUIState({
        ...optimisticUIState,
        status: 'loading'
      })
      try {
        const result: T = await func()
        setOptimisticUIState({
          status: 'succeed',
          result
        })
      } catch (error) {
        setOptimisticUIState({
          ...optimisticUIState,
          status: 'failed',
          error
        })
      }
    }

    invokeFunction()
  }, [])

  return optimisticUIState
}

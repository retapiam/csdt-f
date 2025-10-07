import { useState, useCallback } from 'react'

const useAsyncState = (initialState = null) => {
  const [data, setData] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (asyncFunction) => {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFunction()
      setData(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(initialState)
    setLoading(false)
    setError(null)
  }, [initialState])

  return {
    data,
    loading,
    error,
    execute,
    reset
  }
}

export default useAsyncState
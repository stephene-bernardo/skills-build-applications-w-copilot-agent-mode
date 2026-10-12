import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function useApiCollection(endpoint) {
  const [state, setState] = useState({ endpoint, items: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) {
          setState({ endpoint, items, loading: false, error: '' })
        }
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setState({
            endpoint,
            items: [],
            loading: false,
            error: requestError instanceof Error ? requestError.message : 'Unable to load this information.',
          })
        }
      })

    return () => controller.abort()
  }, [endpoint])

  return state.endpoint === endpoint
    ? state
    : { endpoint, items: [], loading: true, error: '' }
}

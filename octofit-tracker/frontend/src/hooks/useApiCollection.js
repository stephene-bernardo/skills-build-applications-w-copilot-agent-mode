import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function useApiCollection(endpoint, request = fetch) {
  const [state, setState] = useState({ endpoint, items: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, controller.signal, request)
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
  }, [endpoint, request])

  return state.endpoint === endpoint
    ? state
    : { endpoint, items: [], loading: true, error: '' }
}

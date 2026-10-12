const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function readCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) return payload.results
    if (Array.isArray(payload.data)) return payload.data
    if (payload.data && typeof payload.data === 'object' && Array.isArray(payload.data.results)) {
      return payload.data.results
    }
  }
  throw new Error('The API returned an unexpected collection format.')
}

export async function fetchCollection(endpoint, signal, request = fetch) {
  const response = await request(`${API_BASE_URL}${endpoint}`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText}).`)
  }
  return readCollection(await response.json())
}

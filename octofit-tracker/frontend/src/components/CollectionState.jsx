export default function CollectionState({ loading, error, isEmpty, emptyMessage, children }) {
  if (loading) {
    return (
      <div className="collection-message" role="status">
        <span className="spinner-border spinner-border-sm" aria-hidden="true" />
        <span>Loading your Octofit data…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger collection-error" role="alert">
        <strong>We couldn’t load this data.</strong> {error}
      </div>
    )
  }

  if (isEmpty) {
    return <div className="collection-message">{emptyMessage}</div>
  }

  return children
}

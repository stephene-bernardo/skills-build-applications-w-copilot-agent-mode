import CollectionState from './CollectionState.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

function displayName(value) {
  if (value && typeof value === 'object') return value.name || value.username || 'Octofit member'
  return value || 'Octofit member'
}

function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Date unavailable'
    : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export default function Activities() {
  const { items, loading, error } = useApiCollection('/api/activities/', fetch)

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE WORK YOU PUT IN</span>
          <h1>Activities</h1>
          <p>Every session is progress worth celebrating.</p>
        </div>
        <span className="heading-mark" aria-hidden="true">01</span>
      </div>
      <div className="collection-card">
        <div className="card-caption"><span>Recent movement</span><span>{items.length} logged</span></div>
        <CollectionState loading={loading} error={error} isEmpty={items.length === 0} emptyMessage="No activities yet. Your next session can start the story.">
          <div className="table-responsive">
            <table className="table data-table align-middle">
              <thead><tr><th>Activity</th><th>Member</th><th>Team</th><th>Duration</th><th>Calories</th><th>Date</th></tr></thead>
              <tbody>
                {items.map((activity) => (
                  <tr key={activity._id || `${activity.type}-${activity.date}-${activity.user}`}>
                    <td><span className="activity-dot" />{activity.type || 'Workout'}</td>
                    <td>{displayName(activity.user)}</td>
                    <td>{displayName(activity.team)}</td>
                    <td>{activity.durationMinutes ?? '—'} min</td>
                    <td>{activity.calories ?? '—'} kcal</td>
                    <td>{formatDate(activity.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollectionState>
      </div>
    </section>
  )
}

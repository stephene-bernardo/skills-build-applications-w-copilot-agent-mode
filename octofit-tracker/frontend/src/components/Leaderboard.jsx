import CollectionState from './CollectionState.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

function displayName(value) {
  if (value && typeof value === 'object') return value.name || value.username || 'Octofit member'
  return value || 'Octofit member'
}

export default function Leaderboard() {
  const { items, loading, error } = useApiCollection('/api/leaderboard/')

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CHEER EACH OTHER ON</span>
          <h1>Leaderboard</h1>
          <p>Consistency is a team sport. See how everyone is moving.</p>
        </div>
        <span className="heading-mark" aria-hidden="true">02</span>
      </div>
      <div className="collection-card">
        <div className="card-caption"><span>This week’s standouts</span><span>{items.length} ranked</span></div>
        <CollectionState loading={loading} error={error} isEmpty={items.length === 0} emptyMessage="The leaderboard is waiting for its first entries.">
          <div className="table-responsive">
            <table className="table data-table align-middle">
              <thead><tr><th>Rank</th><th>Member</th><th>Team</th><th>Period</th><th>Points</th></tr></thead>
              <tbody>
                {items.map((entry) => (
                  <tr key={entry._id || `${entry.user}-${entry.period}`}>
                    <td><span className={`rank-badge${entry.rank <= 3 ? ' top-rank' : ''}`}>#{entry.rank ?? '—'}</span></td>
                    <td>{displayName(entry.user)}</td>
                    <td>{displayName(entry.team)}</td>
                    <td>{entry.period || 'Current period'}</td>
                    <td><strong>{entry.points ?? 0}</strong> pts</td>
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

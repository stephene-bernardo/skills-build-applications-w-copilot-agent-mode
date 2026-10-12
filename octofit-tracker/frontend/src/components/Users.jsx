import CollectionState from './CollectionState.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'O'
}

export default function Users() {
  const { items, loading, error } = useApiCollection('/api/users/')

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">MEET YOUR COMMUNITY</span>
          <h1>Members</h1>
          <p>People showing up, finding their rhythm, and moving forward.</p>
        </div>
        <span className="heading-mark" aria-hidden="true">04</span>
      </div>
      <CollectionState loading={loading} error={error} isEmpty={items.length === 0} emptyMessage="No members to show just yet.">
        <div className="member-grid">
          {items.map((user) => (
            <article className="member-card" key={user._id || user.username}>
              <div className="member-avatar" aria-hidden="true">{initials(user.name)}</div>
              <h2>{user.name || user.username || 'Octofit member'}</h2>
              <p className="member-handle">{user.username ? `@${user.username}` : 'Community member'}</p>
              <p className="member-bio">{user.bio || 'Making time to move and feel good.'}</p>
            </article>
          ))}
        </div>
      </CollectionState>
    </section>
  )
}

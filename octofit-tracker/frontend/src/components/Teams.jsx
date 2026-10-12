import CollectionState from './CollectionState.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

export default function Teams() {
  const { items, loading, error } = useApiCollection('/api/teams/')

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">BETTER, TOGETHER</span>
          <h1>Teams</h1>
          <p>Find your crew and make every milestone a shared one.</p>
        </div>
        <span className="heading-mark" aria-hidden="true">03</span>
      </div>
      <CollectionState loading={loading} error={error} isEmpty={items.length === 0} emptyMessage="No teams yet. Your future crew is just around the corner.">
        <div className="team-grid">
          {items.map((team) => (
            <article className="team-card" key={team._id || team.name}>
              <div className="team-card-top"><span className="team-symbol" aria-hidden="true">{team.name?.charAt(0) || 'O'}</span><span className="team-members">{Array.isArray(team.members) ? team.members.length : 0} members</span></div>
              <h2>{team.name || 'Octofit team'}</h2>
              <p>{team.description || 'A team building healthy habits together.'}</p>
              <div className="member-chips">
                {(team.members || []).slice(0, 4).map((member, index) => (
                  <span key={member?._id || member?.username || index}>{typeof member === 'object' ? member.name || member.username || 'Member' : 'Member'}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </CollectionState>
    </section>
  )
}

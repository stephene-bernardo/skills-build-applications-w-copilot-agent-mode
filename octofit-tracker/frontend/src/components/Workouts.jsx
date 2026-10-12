import CollectionState from './CollectionState.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

export default function Workouts() {
  const { items, loading, error } = useApiCollection('/api/workouts/', fetch)

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">MADE FOR YOUR NEXT MOVE</span>
          <h1>Workouts</h1>
          <p>Pick a plan that meets you where you are today.</p>
        </div>
        <span className="heading-mark" aria-hidden="true">05</span>
      </div>
      <CollectionState loading={loading} error={error} isEmpty={items.length === 0} emptyMessage="No workouts available yet. Check back for your next challenge.">
        <div className="workout-grid">
          {items.map((workout) => (
            <article className="workout-card" key={workout._id || workout.title}>
              <div className={`workout-art workout-${workout.category || 'general'}`} aria-hidden="true">
                <span>{workout.category || 'move'}</span>
                <span className="workout-art-mark">✳</span>
              </div>
              <div className="workout-details">
                <div className="workout-meta"><span>{workout.durationMinutes ?? '—'} MIN</span><span>{workout.difficulty || 'All levels'}</span></div>
                <h2>{workout.title || 'Workout'}</h2>
                <p>{workout.description || 'A little movement goes a long way.'}</p>
                {Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
                  <ul className="exercise-list">{workout.exercises.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </CollectionState>
    </section>
  )
}

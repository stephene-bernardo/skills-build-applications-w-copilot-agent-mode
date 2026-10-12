import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const pages = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Members', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Home() {
  return (
    <section className="welcome-panel">
      <div className="welcome-copy">
        <span className="eyebrow">YOUR MOVEMENT, YOUR MOMENT</span>
        <h1>Small steps.<br />Stronger together.</h1>
        <p>Make every workout count. Find your people, celebrate your progress, and keep showing up.</p>
        <NavLink className="btn btn-primary btn-lg" to="/activities">
          Explore activity <span aria-hidden="true">→</span>
        </NavLink>
      </div>
      <div className="welcome-art" aria-hidden="true">
        <img src={logo} alt="" />
        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />
      </div>
      <div className="quick-links">
        {pages.map((page, index) => (
          <NavLink className="quick-link" key={page.path} to={page.path}>
            <span className="quick-number">0{index + 1}</span>
            <span>{page.label}</span>
            <span aria-hidden="true">↗</span>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/" aria-label="Octofit Tracker home">
          <img src={logo} alt="" />
          <span>octofit<span className="brand-accent">.</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {pages.map((page) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              key={page.path}
              to={page.path}
            >
              {page.label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="header-cta" to="/workouts">
          Find a workout <span aria-hidden="true">↗</span>
        </NavLink>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span>Octofit Tracker</span>
        <span>Move well. Feel good.</span>
      </footer>
    </div>
  )
}

export default App

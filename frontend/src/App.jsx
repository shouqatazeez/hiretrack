import React from 'react'
import './index.css'

export default function App() {
  return (
    <div id="app-root">
      <header style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ margin: 0 }}>HireTrack</h1>
      </header>

      <main style={{ padding: 20 }}>
        <section>
          <h2>Welcome</h2>
          <p>This is the HireTrack frontend. Use the navigation to access features.</p>
        </section>
      </main>

      <footer style={{ padding: 20, borderTop: '1px solid var(--border)' }}>
        <small>HireTrack &copy; {new Date().getFullYear()}</small>
      </footer>
    </div>
  )
}

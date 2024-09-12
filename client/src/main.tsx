import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/index'
import SubtitlesPage from './pages/subtitles/index'
import SubtitleDetailPage from './pages/subtitles/[id]'
import SearchPage from './pages/search'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subtitles" element={<SubtitlesPage />} />
        <Route path="/subtitles/:id" element={<SubtitleDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)

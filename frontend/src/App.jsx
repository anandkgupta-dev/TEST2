import { useState } from 'react'
import axios from 'axios'
import InputForm from './components/InputForm'
import RecommendationDisplay from './components/RecommendationDisplay'
import { FaGraduationCap } from 'react-icons/fa'

function App() {
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setRecommendation(null)
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await axios.post(`${apiUrl}/api/recommend`, formData)
      setRecommendation(response.data)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'An error occurred while generating recommendations.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1><FaGraduationCap /> EduPath AI</h1>
        <p>Discover your personalized learning journey powered by AI</p>
      </header>

      <main>
        <div className="glass-panel">
          <InputForm onSubmit={handleSubmit} loading={loading} />
          {error && (
            <div style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
        </div>

        {recommendation && <RecommendationDisplay data={recommendation} />}
      </main>
    </div>
  )
}

export default App

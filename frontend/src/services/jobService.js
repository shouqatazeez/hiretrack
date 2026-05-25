import api from './api'

export const fetchJobs = async () => {
  const response = await api.get('/jobs/applications')
  return response.data
}

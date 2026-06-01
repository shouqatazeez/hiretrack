import api from './api'

export const fetchJobs = async () => {
  const response = await api.get('/jobs/applications')
  return response.data
}

export const createJob = async (data) => {
  const response = await api.post('/jobs/applications', data)
  return response.data
}

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/applications/${id}`)
  return response.data
}

export const updateJob = async (id, data) => {
  const response = await api.put(`/jobs/applications/${id}`, data)
  return response.data
}

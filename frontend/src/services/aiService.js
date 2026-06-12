import api from './api'

export async function getMatchScore(jobId) {
  const response = await api.post(`/jobs/applications/${jobId}/match-score`)
  return response.data
}

export async function getInterviewQuestions(jobId) {
  const response = await api.post(`/jobs/applications/${jobId}/interview-questions`)
  return response.data
}

export async function getCoverLetter(jobId) {
  const response = await api.post(`/jobs/applications/${jobId}/cover-letter`)
  return response.data
}

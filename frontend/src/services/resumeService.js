import api from './api'

export async function uploadResume(file, onProgress) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onProgress
      ? (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          onProgress(percent)
        }
      : undefined,
  })
  return response.data
}

export async function getResume() {
  const response = await api.get('/resume')
  return response.data
}

export async function deleteResume() {
  await api.delete('/resume')
}

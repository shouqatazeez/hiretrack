import { useEffect, useRef, useState } from 'react'
import { FileText, Loader2, Trash2, Upload } from 'lucide-react'
import { uploadResume, getResume, deleteResume } from '../../services/resumeService'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'

export default function ResumePage() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    loadResume()
  }, [])

  async function loadResume() {
    try {
      setLoading(true)
      setError(null)
      const data = await getResume()
      setResume(data)
    } catch (err) {
      if (err.response?.status === 404) {
        setResume(null)
      } else {
        setError('Failed to load resume.')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(file) {
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are accepted.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5 MB.')
      return
    }
    try {
      setUploading(true)
      setError(null)
      const data = await uploadResume(file)
      setResume(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload resume.')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true)
      setError(null)
      await deleteResume()
      setResume(null)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete resume.')
    } finally {
      setDeleting(false)
    }
  }

  function onFileChange(e) {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
    e.target.value = ''
  }

  function onDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleUpload(file)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Profile</p>
          <CardTitle className="mt-1">Your Resume</CardTitle>
          <CardDescription>
            Upload your resume to enable AI-powered features like match scoring and interview prep.
          </CardDescription>
        </CardHeader>
      </Card>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!resume && (
        <Card>
          <CardContent className="pt-6">
            <div
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-zinc-700 hover:border-zinc-500'}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm font-medium text-foreground">Drag and drop your resume here</p>
              <p className="mt-1 text-xs text-muted-foreground">PDF only, max 5 MB</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (<><Loader2 className="h-4 w-4 animate-spin mr-2" />Uploading...</>) : 'Choose File'}
              </Button>
              <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={onFileChange} />
            </div>
          </CardContent>
        </Card>
      )}

      {resume && (
        <>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{resume.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded {new Date(resume.uploaded_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Replace'}
                  </Button>
                  <Button variant="outline" size="sm" disabled={deleting} onClick={handleDelete} className="text-destructive hover:text-destructive">
                    {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={onFileChange} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Extracted Content</CardTitle>
              <CardDescription>This is the text the AI will use for analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300 font-sans">{resume.extracted_text}</pre>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

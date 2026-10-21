import { useEffect, useState } from 'react'
import { readProgress } from '../services/progressService'
import type { LearningProgressState } from '../types/progress'

export function useProgress() {
  const [progress, setProgress] = useState<LearningProgressState>(() => readProgress())
  useEffect(() => { const refresh = () => setProgress(readProgress()); window.addEventListener('optmentor-progress-changed', refresh); return () => window.removeEventListener('optmentor-progress-changed', refresh) }, [])
  return progress
}

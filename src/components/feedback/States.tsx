import { AlertCircle, Inbox, LoaderCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface StateProps { title?: string; description?: string }

export function LoadingState({ title = 'Loading', description = 'Preparing your learning experience…' }: StateProps) {
  return <Card className="flex min-h-56 flex-col items-center justify-center p-8 text-center" role="status"><LoaderCircle className="mb-4 animate-spin text-brand-blue" size={30} /><h2 className="text-lg font-bold text-ink">{title}</h2><p className="mt-2 max-w-md text-sm text-muted">{description}</p></Card>
}

export function EmptyState({ title = 'Nothing here yet', description = 'Content will appear here when it becomes available.' }: StateProps) {
  return <Card className="flex min-h-56 flex-col items-center justify-center p-8 text-center"><span className="mb-4 rounded-2xl bg-brand-blue-soft p-3 text-brand-blue"><Inbox size={28} /></span><h2 className="text-lg font-bold text-ink">{title}</h2><p className="mt-2 max-w-md text-sm text-muted">{description}</p></Card>
}

interface ErrorStateProps extends StateProps { onRetry?: () => void }

export function ErrorState({ title = 'Something went wrong', description = 'Please try again. If the problem continues, return to the previous page.', onRetry }: ErrorStateProps) {
  return <Card className="flex min-h-56 flex-col items-center justify-center border-red-100 p-8 text-center" role="alert"><span className="mb-4 rounded-2xl bg-red-50 p-3 text-danger"><AlertCircle size={28} /></span><h2 className="text-lg font-bold text-ink">{title}</h2><p className="mt-2 max-w-md text-sm text-muted">{description}</p>{onRetry && <Button className="mt-5" variant="secondary" onClick={onRetry}>Try again</Button>}</Card>
}

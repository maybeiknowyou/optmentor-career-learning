import { SearchX } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'

export function CareerEmptyState({ onClear }: { onClear: () => void }) {
  return <Card className="flex min-h-72 flex-col items-center justify-center p-8 text-center"><span className="grid size-14 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue"><SearchX size={28} /></span><h2 className="mt-5 text-xl font-extrabold text-ink">No career fields found</h2><p className="mt-2 max-w-md text-sm leading-6 text-muted">Try a broader search, choose another category, or clear the current filters to view all ten fields.</p><Button className="mt-5" variant="secondary" onClick={onClear}>Clear filters</Button></Card>
}

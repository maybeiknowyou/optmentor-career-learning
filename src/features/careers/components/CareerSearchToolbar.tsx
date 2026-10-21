import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

interface CareerSearchToolbarProps {
  value: string
  resultCount: number
  hasFilters: boolean
  onChange: (value: string) => void
  onClear: () => void
}

export function CareerSearchToolbar({ value, resultCount, hasFilters, onChange, onClear }: CareerSearchToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-3 shadow-card sm:flex-row sm:items-center sm:p-4">
      <div className="min-w-0 flex-1"><Input aria-label="Search career fields" placeholder="Search by career, description or skill…" leadingIcon={<Search size={18} />} value={value} onChange={(event) => onChange(event.target.value)} /></div>
      <div className="flex items-center justify-between gap-3 sm:justify-end"><span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted"><SlidersHorizontal size={16} aria-hidden="true" /><strong className="text-ink">{resultCount}</strong> {resultCount === 1 ? 'field' : 'fields'}</span>{hasFilters && <Button variant="ghost" size="sm" leftIcon={<X size={16} />} onClick={onClear}>Clear filters</Button>}</div>
    </div>
  )
}

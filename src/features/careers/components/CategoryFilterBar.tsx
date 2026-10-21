import { careerCategories, type CareerCategory } from '../../../types/career'
import { cn } from '../../../lib/cn'

export type CategoryFilter = 'All Fields' | CareerCategory

interface CategoryFilterBarProps { value: CategoryFilter; onChange: (category: CategoryFilter) => void }

export function CategoryFilterBar({ value, onChange }: CategoryFilterBarProps) {
  const options: CategoryFilter[] = ['All Fields', ...careerCategories]
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" aria-label="Career categories">
      <div className="flex min-w-max gap-2" role="group">
        {options.map((category) => {
          const active = category === value
          return <button key={category} type="button" aria-pressed={active} className={cn('min-h-11 cursor-pointer rounded-xl border px-4 text-sm font-semibold transition-all', active ? 'border-brand-blue bg-brand-blue text-white shadow-md shadow-blue-200' : 'border-line bg-white text-slate-600 hover:border-blue-200 hover:bg-brand-blue-soft hover:text-brand-blue')} onClick={() => onChange(category)}>{category}</button>
        })}
      </div>
    </div>
  )
}

import { cn } from '../../lib/cn'

export interface TabItem { id: string; label: string }
interface TabsProps { items: TabItem[]; activeId: string; onChange: (id: string) => void; label?: string }

export function Tabs({ items, activeId, onChange, label = 'Sections' }: TabsProps) {
  return (
    <div className="overflow-x-auto border-b border-line" role="tablist" aria-label={label}>
      <div className="flex min-w-max gap-7">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <button key={item.id} type="button" role="tab" aria-selected={isActive} className={cn('relative min-h-12 cursor-pointer whitespace-nowrap px-1 text-sm font-semibold transition-colors', isActive ? 'text-brand-blue' : 'text-muted hover:text-ink')} onClick={() => onChange(item.id)}>
              {item.label}
              {isActive && <span className="tab-underline absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand-blue" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

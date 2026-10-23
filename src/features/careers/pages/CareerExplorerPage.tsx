import { Compass, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '../../../components/ui/Badge'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs'
import { careers } from '../../../data/careers'
import { careerCategories } from '../../../types/career'
import { CareerEmptyState } from '../components/CareerEmptyState'
import { CareerGrid } from '../components/CareerGrid'
import { CareerSearchToolbar } from '../components/CareerSearchToolbar'
import { CategoryFilterBar, type CategoryFilter } from '../components/CategoryFilterBar'

function validCategory(value: string | null): CategoryFilter {
  return value && careerCategories.includes(value as (typeof careerCategories)[number]) ? value as CategoryFilter : 'All Fields'
}

export function CareerExplorerPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const category = validCategory(searchParams.get('category'))

  const filteredCareers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return careers.filter((career) => {
      const categoryMatches = category === 'All Fields' || career.category === category
      const searchableText = [career.title, career.shortDescription, career.detailedDescription, ...career.keySkills].join(' ').toLowerCase()
      return categoryMatches && (!normalizedQuery || searchableText.includes(normalizedQuery))
    })
  }, [category, query])

  function updateQuery(value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  function updateCategory(value: CategoryFilter) {
    const next = new URLSearchParams(searchParams)
    if (value === 'All Fields') next.delete('category')
    else next.set('category', value)
    setSearchParams(next, { replace: true })
  }

  function clearFilters() { setSearchParams({}, { replace: true }) }
  const hasFilters = Boolean(query.trim()) || category !== 'All Fields'

  return (
    <div className="mx-auto max-w-[1560px] space-y-6">
      <Breadcrumbs items={[{ label: 'Career Learning' }, { label: 'Career Fields' }]} />
      <section className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-8 text-white shadow-xl sm:px-8 lg:px-10">
        <div className="absolute -right-16 -top-28 size-80 rounded-full bg-brand-blue/25 blur-2xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 size-32 rounded-full bg-cyan-400/10 blur-xl" aria-hidden="true" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div className="max-w-3xl"><Badge className="bg-white/10 text-blue-100"><Sparkles size={13} className="mr-1.5" />Twenty complete pathways</Badge><h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Explore Career Fields</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">Discover practical pathways across digital technology, engineering, skilled crafts, agriculture and green jobs. Search by what you want to learn or browse a category.</p></div><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3"><span className="grid size-10 place-items-center rounded-xl bg-brand-blue"><Compass size={21} /></span><span><strong className="block text-xl leading-none">{careers.length}</strong><span className="text-xs text-blue-200">career fields</span></span></div></div>
      </section>

      <CareerSearchToolbar value={query} resultCount={filteredCareers.length} hasFilters={hasFilters} onChange={updateQuery} onClear={clearFilters} />
      <CategoryFilterBar value={category} onChange={updateCategory} />

      <section aria-live="polite" aria-label="Career field results">
        {filteredCareers.length > 0 ? <CareerGrid careers={filteredCareers} /> : <CareerEmptyState onClear={clearFilters} />}
      </section>
    </div>
  )
}

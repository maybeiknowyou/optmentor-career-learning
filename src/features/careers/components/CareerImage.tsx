import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../../lib/cn'
import type { CareerImageAsset } from '../../../types/career'

interface CareerImageProps { image: CareerImageAsset; className?: string }

export function CareerImage({ image, className }: CareerImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={cn('flex items-center justify-center bg-gradient-to-br from-brand-navy to-brand-blue text-blue-100', className)} role="img" aria-label={`${image.alt} unavailable`}><span className="flex flex-col items-center gap-2 text-xs font-semibold"><ImageOff size={28} />Image unavailable</span></div>
  }

  return (
    <div className={cn('relative overflow-hidden bg-slate-200', className)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" aria-hidden="true" />}
      <img src={image.src} alt={image.alt} className={cn('size-full object-cover transition duration-500', loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0')} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} loading="lazy" />
    </div>
  )
}

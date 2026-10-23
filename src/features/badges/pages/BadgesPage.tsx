import { Award, LockKeyhole } from 'lucide-react'
import { Badge as StatusBadge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { badgeDefinitions, getEarnedBadges } from '../../../data/badges'

import { useState, useEffect } from 'react'

export function BadgesPage() {
  const [earned, setEarned] = useState(() => getEarnedBadges())

  useEffect(() => {
    function refresh() {
      setEarned(getEarnedBadges())
    }
    window.addEventListener('optmentor-progress-changed', refresh)
    window.addEventListener('optmentor-assessment-changed', refresh)
    return () => {
      window.removeEventListener('optmentor-progress-changed', refresh)
      window.removeEventListener('optmentor-assessment-changed', refresh)
    }
  }, [])
  return <div className="mx-auto max-w-[1420px] space-y-6"><div><StatusBadge>Achievements</StatusBadge><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Your OptMentor badges</h1><p className="mt-3 text-base leading-7 text-muted">OptMentor achievements based on your saved learning and assessment activity. These are not provider certificates.</p></div><Card className="flex items-center gap-4 p-6"><span className="grid size-12 place-items-center rounded-2xl bg-amber-50 text-amber-600"><Award size={26} /></span><div><p className="text-2xl font-extrabold text-ink">{earned.length} / {badgeDefinitions.length}</p><p className="text-sm text-muted">badges earned</p></div></Card><div className="grid gap-4 md:grid-cols-2">{badgeDefinitions.map((badge) => { const item = earned.find((entry) => entry.id === badge.id); return <Card key={badge.id} className={`p-6 ${item ? 'border-amber-200' : 'opacity-75'}`}><div className="flex items-start gap-4"><span className={`grid size-12 place-items-center rounded-2xl ${item ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>{item ? <Award size={25} /> : <LockKeyhole size={22} />}</span><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-extrabold text-ink">{badge.title}</h2><StatusBadge tone={item ? 'green' : 'slate'}>{item ? 'Earned' : 'Locked'}</StatusBadge></div><p className="mt-2 text-sm leading-6 text-muted">{badge.description}</p><p className="mt-3 text-xs font-semibold text-slate-500">Requirement: {badge.requirement}</p>{item && <p className="mt-2 text-xs text-success">Earned {new Date(item.earnedAt).toLocaleDateString()}</p>}</div></div></Card> })}</div></div>
}

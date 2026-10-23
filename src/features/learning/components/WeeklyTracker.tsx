import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  getWeeklySummary,
  subscribeToWeeklyTracker,
} from '../../../services/weeklyTrackerService'
import type { TrackerDayItem } from '../../../types/weeklyTracker'

export function WeeklyTracker() {
  const [weekOffset, setWeekOffset] = useState<number>(0)
  const [trackerVersion, setTrackerVersion] = useState<number>(0)
  const [selectedDay, setSelectedDay] = useState<TrackerDayItem | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToWeeklyTracker(() => {
      setTrackerVersion((v) => v + 1)
    })
    return unsubscribe
  }, [])

  const summary = useMemo(() => {
    void trackerVersion
    return getWeeklySummary(weekOffset)
  }, [weekOffset, trackerVersion])

  const goalPercentage = Math.min(100, Math.round((summary.learningDaysCount / summary.weeklyGoalDays) * 100))

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              7-Day Weekly Learning Tracker
            </h2>
            {summary.currentStreak > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <span>🔥</span>
                <span>{summary.currentStreak} Day Streak</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Week: <span className="text-slate-200 font-medium">{summary.weekStartDate}</span> to{' '}
            <span className="text-slate-200 font-medium">{summary.weekEndDate}</span>
            {weekOffset === 0 && <span className="ml-2 text-emerald-400 font-semibold">(Current Week)</span>}
          </p>
        </div>

        {/* Week navigation buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setWeekOffset((prev) => prev - 1)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Previous Week"
          >
            ← Previous
          </button>
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition"
            >
              Current Week
            </button>
          )}
          <button
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Next Week"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Metric 1: Learning Goal */}
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>Weekly Learning Goal</span>
            <span className="font-semibold text-emerald-400">{summary.learningDaysCount} / {summary.weeklyGoalDays} Days</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${goalPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {goalPercentage >= 100
              ? '🎉 Weekly goal achieved! Excellent discipline.'
              : `${summary.weeklyGoalDays - summary.learningDaysCount} more learning days needed to hit goal.`}
          </p>
        </div>

        {/* Metric 2: Distinction between Login vs Learning */}
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
          <div className="text-xs text-slate-400 mb-2">Activity Breakdown</div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-300">Learning Days:</span>
              <span className="text-sm font-bold text-emerald-400">{summary.learningDaysCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span className="text-xs text-slate-300">Login Days:</span>
              <span className="text-sm font-bold text-blue-400">{summary.loginDaysCount}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 italic">
            * Note: Logging in alone does not count as a completed learning day.
          </p>
        </div>

        {/* Metric 3: Total Completed Activities */}
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
          <div className="text-xs text-slate-400 mb-1">Completed Learning Events</div>
          <div className="text-2xl font-bold text-white">
            {summary.completedActivitiesCount}
            <span className="text-xs font-normal text-slate-400 ml-2">recorded activities</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Includes lesson starts, completions, milestones, and assessment quizzes.
          </p>
        </div>
      </div>

      {/* 7-Day Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-6">
        {summary.days.map((day) => {
          const isSelected = selectedDay?.date === day.date
          return (
            <button
              key={day.date}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className={`flex flex-col items-center p-2.5 sm:p-3 rounded-xl border transition-all text-center relative ${
                day.isToday
                  ? 'border-emerald-500/80 bg-emerald-950/20 shadow-md ring-1 ring-emerald-500/40'
                  : isSelected
                  ? 'border-slate-500 bg-slate-800'
                  : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-700'
              } ${day.isFuture ? 'opacity-40' : ''}`}
            >
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {day.dayName}
              </span>
              <span className="text-[9px] text-slate-500">Day {day.daySequenceNumber}</span>
              <span className="text-sm sm:text-base font-bold text-white mt-0.5">
                {day.date.split('-')[2]}
              </span>

              {/* Status Indicators */}
              <div className="flex items-center gap-1 mt-2">
                {day.meaningfulLearning ? (
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"
                    title="Meaningful learning completed"
                  />
                ) : day.appOpened ? (
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-blue-400"
                    title="App opened only (no lesson completed)"
                  />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" title="No activity recorded" />
                )}
              </div>

              {day.isToday && (
                <span className="absolute -top-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500 text-slate-950 uppercase">
                  Today
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected Day Details (if clicked) */}
      {selectedDay && (
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700 text-xs">
            <span className="font-semibold text-slate-200">
              Activity Details for {selectedDay.dayName}, {selectedDay.date} (Day {selectedDay.daySequenceNumber})
            </span>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕ Close
            </button>
          </div>
          {selectedDay.details ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400">Application Open: </span>
                <span className={selectedDay.details.appOpened ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                  {selectedDay.details.appOpened ? 'Yes (Logged In)' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Meaningful Learning: </span>
                <span className={selectedDay.details.meaningfulLearning ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                  {selectedDay.details.meaningfulLearning ? 'Yes' : 'No'}
                </span>
              </div>
              {selectedDay.details.coursesStarted.length > 0 && (
                <div className="sm:col-span-2 text-slate-300">
                  <span className="text-slate-400">Courses Started: </span>
                  {selectedDay.details.coursesStarted.join(', ')}
                </div>
              )}
              {selectedDay.details.coursesCompleted.length > 0 && (
                <div className="sm:col-span-2 text-emerald-300">
                  <span className="text-slate-400">Courses Completed: </span>
                  {selectedDay.details.coursesCompleted.join(', ')}
                </div>
              )}
              {selectedDay.details.assessmentsAttempted.length > 0 && (
                <div className="sm:col-span-2">
                  <span className="text-slate-400">Quizzes & Assessments: </span>
                  {selectedDay.details.assessmentsAttempted.map((a, i) => (
                    <span key={i} className="inline-block bg-slate-700 px-2 py-0.5 rounded text-[11px] mr-2 mt-1">
                      {a.title} ({a.score}%) - {a.passed ? 'Passed' : 'Review needed'}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No activity recorded on this day.</p>
          )}
        </div>
      )}

      {/* 7-Day Recommended Sequence Card */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-800/40 border border-slate-700 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                Recommended Progression
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                {summary.recommendedAction.dayTitle}
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl">
              {summary.recommendedAction.description}
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Link
              to={summary.recommendedAction.actionRoute}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all w-full sm:w-auto ${
                summary.recommendedAction.isDay7Test
                  ? summary.recommendedAction.readyForTest
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/20'
                    : 'bg-amber-600/30 hover:bg-amber-600/40 text-amber-200 border border-amber-500/40'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
              }`}
            >
              {summary.recommendedAction.isDay7Test && summary.recommendedAction.readyForTest && (
                <span>📝</span>
              )}
              {summary.recommendedAction.actionLabel}
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 7-Day Progression Legend */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] text-slate-400">
          <div className="p-1.5 rounded bg-slate-900/40">
            <span className="font-semibold text-slate-300">Day 1:</span> Begin & Baseline
          </div>
          <div className="p-1.5 rounded bg-slate-900/40">
            <span className="font-semibold text-slate-300">Days 2–3:</span> Foundational Lessons
          </div>
          <div className="p-1.5 rounded bg-slate-900/40">
            <span className="font-semibold text-slate-300">Days 4–5:</span> Core Skills & Practical Tasks
          </div>
          <div className="p-1.5 rounded bg-slate-900/40">
            <span className="font-semibold text-slate-300">Day 6:</span> Revise & Practice
          </div>
          <div className="p-1.5 rounded bg-slate-900/40 border border-emerald-500/30 text-emerald-300">
            <span className="font-semibold">Day 7:</span> Weekly Review Test
          </div>
        </div>
      </div>
    </div>
  )
}

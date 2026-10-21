const BOOKMARKS_KEY = 'optmentor.resource-bookmarks.v1'
const VISITED_KEY = 'optmentor.resource-visits.v1'
function read(key: string): string[] { try { return JSON.parse(localStorage.getItem(key) ?? '[]') as string[] } catch { return [] } }
function write(key: string, values: string[]) { localStorage.setItem(key, JSON.stringify(values)); window.dispatchEvent(new CustomEvent('optmentor-resource-preferences')) }
export function bookmarkedResources() { return read(BOOKMARKS_KEY) }
export function isResourceBookmarked(id: string) { return bookmarkedResources().includes(id) }
export function toggleResourceBookmark(id: string) { const current = bookmarkedResources(); write(BOOKMARKS_KEY, current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); return !current.includes(id) }
export function markResourceVisited(id: string) { const current = read(VISITED_KEY).filter((item) => item !== id); write(VISITED_KEY, [id, ...current].slice(0, 50)) }
export function visitedResources() { return read(VISITED_KEY) }

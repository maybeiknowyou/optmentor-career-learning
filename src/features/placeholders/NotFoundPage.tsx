import { Link } from 'react-router-dom'
import { ErrorState } from '../../components/feedback/States'
import { Button } from '../../components/ui/Button'

export function NotFoundPage() {
  return <div className="mx-auto max-w-2xl"><ErrorState title="Page not found" description="This career-learning route does not exist." /><Link className="mt-5 flex justify-center" to="/career-learning/careers"><Button>Return to Career Fields</Button></Link></div>
}

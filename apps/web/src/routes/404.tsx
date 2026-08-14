import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/404')({
  component: NotFound,
})

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

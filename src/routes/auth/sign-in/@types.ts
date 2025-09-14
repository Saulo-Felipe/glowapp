import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-in/@types')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/sign-in/@types"!</div>
}

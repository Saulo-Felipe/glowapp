import { createFileRoute, redirect, type FileRoutesByPath } from '@tanstack/react-router'

export const Route = createFileRoute('/' as keyof FileRoutesByPath)({
  loader: () => {
    throw redirect({
      to: '/auth/sign-in/page',
    })
  },
  component: () => null,
})

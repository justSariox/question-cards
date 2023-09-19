import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/ui/layout/Layout.tsx'
import { Decks } from '@/pages/decks.tsx'
import { SignInPage } from '@/pages/sign-in.tsx'
import { SignUpPage } from '@/pages/sign-up.tsx'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import { useGetDecksQuery } from '@/services/decks/decks.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]

const Component = () => {
  const { data } = useGetDecksQuery()

  return <div>2</div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/',
            element: <Decks />,
          },
          {
            path: '/2',
            element: <Component />,
          },
        ],
      },
    ],
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data } = useGetMeQuery()
  const isAuthenticated = data

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />
}

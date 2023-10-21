import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/ui/layout/Layout.tsx'
import { Deck } from '@/pages/deck/deck.tsx'
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
            path: '/deck/*',
            element: <Deck />,
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

  return data ? <Outlet /> : <Navigate to="/sign-in" />
}

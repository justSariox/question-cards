import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { EditProfile } from '@/components/auth/editProfile'
import { ForgotPasswordForm } from '@/components/auth/forgot-password'
import { Layout } from '@/components/ui/layout/Layout.tsx'
import { SignInPage } from '@/pages/auth/sign-in.tsx'
import { SignUpPage } from '@/pages/auth/sign-up.tsx'
import { CardPage } from '@/pages/decks/deck/card/card.tsx'
import { Deck } from '@/pages/decks/deck/deck.tsx'
import { Decks } from '@/pages/decks/decks.tsx'
import { NotFound } from '@/pages/not-found/not-found.tsx'
import { useGetMeQuery } from '@/services/auth/auth.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/recover-password',
    element: <ForgotPasswordForm />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

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
            path: '/decks/:deckId',
            element: <Deck />,
          },
          {
            path: '/decks/:deckId/learn',
            element: <CardPage />,
          },
          {
            path: '/my-profile',
            element: <EditProfile />,
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

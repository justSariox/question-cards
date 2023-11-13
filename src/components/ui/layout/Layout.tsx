import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header'
import { useGetMeQuery } from '@/services/auth/auth.ts'

export const Layout = () => {
  const { data } = useGetMeQuery()

  return (
    <div>
      <Header isLoggedIn={!!data} user={data} />
      <Outlet />
    </div>
  )
}

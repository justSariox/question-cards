import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/components/auth/login-form'
import { useGetMeQuery } from '@/services/auth/auth.ts'

export const SignInPage = () => {
  const { data: me } = useGetMeQuery()

  useEffect(() => {
    if (me) return navigate('/')
  }, [me])

  const navigate = useNavigate()

  return <LoginForm />
}

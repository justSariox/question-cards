import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/components/auth/login-form'
import { Loader } from '@/components/ui/loader'
import { useGetMeQuery } from '@/services/auth/auth.ts'

export const SignInPage = () => {
  const navigate = useNavigate()
  const { data: me, isLoading: getMeIsLoading, isError: getMeIsError } = useGetMeQuery()

  useEffect(() => {
    if (me) return navigate('/')
  }, [me])

  if (getMeIsLoading) return <Loader />
  if (getMeIsError) return <div>Error</div>

  return <LoginForm />
}

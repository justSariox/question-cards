export type User = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type Login = {
  email: string
  password: string
  rememberMe: boolean
}

export type SignUp = {
  email: string
  password: string
}

export type SignUpResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type EditProfileParams = {
  avatar?: string
  name: string
  email?: string
}

export type EditProfileResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type ResendEmailVerification = {
  html: string
  userId: string
  subject: string
}

export type RecoverPassword = {
  html: string
  email: string
  subject: string
}

export type ResetPassword = {
  token: string
  password: string
}

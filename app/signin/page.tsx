"use server"

import SignInPage from '@/components/Signin/SignInPage'
import { getProviders } from 'next-auth/react'
import React from 'react'

const page = async () => {
  const providers = await getProviders()
  return (
    <div>
      <SignInPage providers={providers} />
    </div>
  )
}

export default page
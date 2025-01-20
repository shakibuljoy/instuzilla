"use client"
import { logOutUser } from '@/utils/fetchUser'
import { useRouter } from 'next/navigation'

export default function Page() {
    logOutUser()
    const router = useRouter()
  return router.push('/authentication/login')
}

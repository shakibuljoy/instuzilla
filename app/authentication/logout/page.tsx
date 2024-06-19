"use client"
import { logOutUser } from '@/utils/fetchUser'
import { useRouter } from 'next/navigation'

export default function page() {
    logOutUser()
    const router = useRouter()
  return router.push('/authentication/login')
}

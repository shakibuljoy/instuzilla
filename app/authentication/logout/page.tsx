"use server"
import { logOutUser } from '@/utils/fetchUser'

export default function Page() {
    logOutUser()
}

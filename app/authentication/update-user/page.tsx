"use client";
import { logOutUser, updateUser } from '@/utils/fetchUser';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [previousPage, setPreviousPage] = useState<string | null>(null);

    useEffect(() => {
        // Check for query parameter or referrer header (adjust based on your setup)
        const referrer = searchParams.get('from') || document.referrer;
        if (referrer && referrer !== window.location.href) { // Avoid self-referencing
          setPreviousPage(referrer);
        }
      }, []);

    useEffect(() => {
        async function checkUser() {
            const user = await updateUser();
            if (user) {
                const redirectUrl = previousPage || '/';
                router.push(redirectUrl);
            } else {
                logOutUser();
                
                router.push('/authentication/login');
            }
        }
        checkUser();
    }, [router]);

 

    return <div>Loading...</div>;
}

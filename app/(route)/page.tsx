'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    if (!token || token == '' ) {
      router.push('/login')
    } else {
      router.push('/books');
    }
  }, [])
}

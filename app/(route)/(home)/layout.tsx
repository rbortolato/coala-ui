'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next';
import Navbar from "@/app/components/navbar"
import Sidebar from "@/app/components/siderBar"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    if (!token || token == '' ) {
      router.push('/login')
    }
  }, [])

  return (
    <div className="grid min-h-screen grid-rows-header">
      <div className="bg-white shadow-sm z-10">
        <Navbar />
      </div>
      <div className="grid grid-cols-sidebar">
        <div><Sidebar /></div>
        <div className="bg-white px-12 pt-2">{children}</div>
      </div>
    </div>
  )
}

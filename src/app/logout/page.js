'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
export default function Logout() {
    const router = useRouter();
    Cookies.remove("AuthUser");
    router.push('/login');
}

'use client';

import { Button } from "@/components/ui/button"

export default function LogoutButton() {
    const logout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Logout failed');
            }

            console.log('Login successful:');

        } catch(error) {
            console.error('Logout Error', error)
        }

    }
    return (
        <div>
            <Button onClick={logout} variant="outline">Logout</Button>
        </div>
    )
}
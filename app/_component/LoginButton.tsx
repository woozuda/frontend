'use client';

import { Button } from "@/components/ui/button"

export default function LoginButton() {
    const loginGoogle = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                //     id: 1,
                //     nickname: 'woozuda',
                // }),
                credentials: 'include'
            })

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await res.json();
            console.log('Login successful:', data);

        } catch(error) {
            console.error('Login Error', error)
        }

    }
    return (
        <div>
            <Button onClick={loginGoogle} variant="outline">Login Button</Button>
        </div>
    )
}
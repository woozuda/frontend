import Image from "next/image";
import kakaoIcon from '@/public/assets/login/kakao.png.png';
import naverIcon from '@/public/assets/login/naver.png.png';
import googleIcon from '@/public/assets/login/google.png.png';
import Link from "next/link";

export default function authPage() {
    return (
        <main className="h-full min-h-screen w-full sm:min-w-[450px] sm:max-w-[500px] flex justify-center bg-auth bg-cover bg-no-repeat bg-center bg-sky-950">
            <div className="h-full min-h-screen flex flex-col justify-center items-center gap-32">
                <section className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-semibold text-white">매일 나만의</h1>
                    <h1 className="text-2xl font-semibold text-white">우주를 기록하세요</h1>
                </section>
                <section className="flex flex-col gap-6">
                    <div className="flex gap-4">
                        <Link href={`${process.env.NEXT_PUBLIC_KAKAO_URL}`}>
                            <Image width={60} height={60} src={kakaoIcon} alt="kakao"/>
                        </Link>
                        <Link href={`${process.env.NEXT_PUBLIC_KAKAO_URL}`}>
                            <Image width={60} height={60} src={naverIcon} alt="naver"/>
                        </Link>
                        <Link href={`${process.env.NEXT_PUBLIC_KAKAO_URL}`}>
                        <Image width={60} height={60} src={googleIcon} alt="google"/>
                        </Link>                        
                    </div>
                    <div className="flex justify-center gap-4">
                        <div>
                            <Link href={'/auth/signin'}><span className="text-white">가입하기</span></Link>
                        </div>
                        <div className="text-xl text-white"> | </div>
                        <div>
                            <Link href={'/auth/login'}><span className="text-white">로그인하기</span></Link>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    )
}
'use client';

import ArrowLeftIcon from "@/app/assets/icons/ArrowLeft.svg";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    const onClickArrow = () => {
        router.back()
    }
    return (
        <ArrowLeftIcon onClick={onClickArrow} />
    )
}
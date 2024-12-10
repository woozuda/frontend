'use client';

import BackButton from "@/app/_component/BackButton"
import { RETROSPECT } from "@/app/diary/_component/retrospectData";
import RetrospectCard from "@/app/diary/_component/RetrospectCard"
import { useState } from "react";

export default function RetrospectSelectPage() {
    const [selectedRetrospectId, setSelectedRetrospectID] = useState<number | null>(null);

    const handleRetrospectClick = (id: number) => {
        setSelectedRetrospectID(id);
    };

    return (
        <main className="h-full min-h-screen w-full sm:min-w-[450px] sm:max-w-[500px] flex flex-col items-center gap-12 py-6 px-4">
            <section className="w-full">
                <div className="flex gap-6">
                <BackButton />
                <h1 className="font-bold">회고하기</h1>
                </div>
            </section>
            <section className="w-full">
                {RETROSPECT.map((retrospect) => (
                    <div className="flex flex-col gap-6" key={retrospect.retrospectId}>
                        <RetrospectCard retrospect={retrospect} onClickCard={handleRetrospectClick} isSelected={selectedRetrospectId === retrospect.retrospectId} />
                    </div>
                ))}
            </section>
        </main>    
    )
}
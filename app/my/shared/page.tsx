"use client";

import { DefaultHeader } from "@/components/header";
import { useState } from "react";
import SharedTab from "../_component/SharedTab";
import ShortLinkDrawer from "../_component/ShortLinkDrawer";
import { useShortlink } from "../_hooks/useShortlink";

export default function SharedPage() {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useShortlink();

  const onShare = () => {
    setIsOpen(true);
  };

  if (!data) {
    return null
  }

  return (
    <main className="h-full w-full sm:min-w-[450px] sm:max-w-[500px] py-6 px-4">
      <div className="flex flex-col gap-6">
        <section className="w-full flex flex-col gap-6">
          <DefaultHeader title="공유한 일기" onShare={onShare} />
        </section>
        <section className="w-full">
          <SharedTab />
        </section>
      </div>
      <ShortLinkDrawer shortlink={data.shortlink} isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
}

"use client";

import { DefaultHeader } from "@/components/header";
import SharedTab from "../_component/SharedTab";
import ShortLinkDrawer from "../_component/ShortLinkDrawer";
import { useState } from "react";

export default function SharedPage() {
  const [isOpen, setIsOpen] = useState(false);

  const onShare = () => {
    setIsOpen(true);
  };

  return (
    <main className="h-full w-full sm:min-w-[450px] sm:max-w-[500px] py-6 px-4 overflow-y-scroll">
      <div className="flex flex-col gap-6">
        <section className="w-full flex flex-col gap-6">
          <DefaultHeader title="공유한 일기" onShare={onShare} />
        </section>
        <section className="w-full">
          <SharedTab />
        </section>
      </div>
      <ShortLinkDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
}

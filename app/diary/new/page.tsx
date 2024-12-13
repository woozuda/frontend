"use client";

import BackButton from "@/app/_component/BackButton";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { useCreateDiary } from "../_hooks/useCreateDiary";
import { useRandomCover } from "../_hooks/useRandomCover";
import { useUploadCover } from "../_hooks/useUploadCover";
import Image from "next/image";

export default function CreateDiaryPage() {
  const [diaryName, setDiaryName] = useState("");
  const [diaryThemeInput, setDiaryThemeInput] = useState("");
  const [diaryTheme, setDiaryTheme] = useState<string[]>([]);
  const [diaryCover, setDiaryCover] = useState<null | FormData | string>(null);
  const [diaryCoverPreview, setDiaryCoverPreview] = useState("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const themeInput = useRef<HTMLInputElement>(null);

  const handleRandomCoverSuccess = (data: { imageUrl: string }) => {
    setIsOpen(false);
    setDiaryCover(data.imageUrl);
    setDiaryCoverPreview(data.imageUrl);
  };
  const handleUploadCoverSuccess = (data: { imageUrl: string }) => {
    setIsOpen(false);
    setDiaryCover(data.imageUrl);
    setDiaryCoverPreview(data.imageUrl);
  };

  const { randomCoverMutate, randomCoverIsPending } = useRandomCover(
    handleRandomCoverSuccess
  );
  const { uploadCoverMutate, uploadCoverIsPending } = useUploadCover(
    handleUploadCoverSuccess
  );

  const { mutate, isPending } = useCreateDiary({
    title: diaryName,
    subject: diaryTheme,
    imgUrl: diaryCover,
  });

  const handleButtonClick = () => {
    //앨범에서 선택하기 click -> input trigger
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("multipartFile ", file);

      uploadCoverMutate(formData)
    }
    setIsOpen(false);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryThemeInput(e.target.value);
  };
  const handleThemeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      const trimmedValue = diaryThemeInput.trim();
      if (trimmedValue) {
        setDiaryTheme((prevThemes) => [...prevThemes, trimmedValue]);
        setDiaryThemeInput("");
      }
    }
  };
  const removeChip = (index: number) => {
    setDiaryTheme((prevThemes) => prevThemes.filter((_, i) => i !== index));
  };

  const allSet = () => {
    let allSet = false
    if (!diaryCover) {
      toast.error("다이어리 표지를 선택하세요.")
      return allSet
    }
    if (!diaryName) {
      toast.error("다이어리 제목을 입력하세요.")
      return allSet
    }
    if (diaryTheme.length === 0) {
      toast.error("다이어리 주제를 입력하세요.")
      return allSet
    }
    allSet = true
    return allSet
  }

  return (
    <main className="h-full min-h-screen w-full sm:min-w-[450px] sm:max-w-[500px] flex flex-col items-center gap-12 py-6 px-4">
      <section className="w-full">
        <div className="flex gap-6">
          <BackButton />
          <h1 className="font-bold">다이어리 만들기</h1>
        </div>
      </section>
      <section className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Label>다이어리 표지</Label>
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              {diaryCoverPreview ? (
                <div
                  className="flex justify-center"
                  onClick={() => setIsOpen(true)}
                >
                  <Image
                    src={diaryCoverPreview}
                    alt="Diary Cover"
                    width={250}
                    height={250}
                    className="mt-6"
                  />
                </div>
              ) : (
                <div
                  className="flex justify-center items-center m-auto bg-slate-200 rounded-xl w-[250px] h-[250px]"
                  onClick={() => setIsOpen(true)}
                >
                  <div className="flex items-center justify-center bg-slate-400 rounded-full w-[50px] h-[50px] text-4xl font-thin text-white">
                    +
                  </div>
                </div>
              )}
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col gap-4 pb-6 px-4">
                <DrawerHeader>
                  <DrawerTitle className="mr-auto">다이어리 표지</DrawerTitle>
                </DrawerHeader>
                <Button variant={"outline"} onClick={handleButtonClick}>
                  앨범에서 선택하기
                </Button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <Button
                  variant={"outline"}
                  onClick={() => {
                    if (!randomCoverIsPending) {
                      randomCoverMutate();
                    }
                  }}
                >
                  랜덤 이미지 생성하기
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="diary-name">다이어리 제목</Label>
          <Input
            id="diary-name"
            name="diary-name"
            placeholder="제목을 적어주세요"
            value={diaryName}
            onChange={(e) => setDiaryName(e.target.value)}
            className="w-full h-12 bg-slate-100 border-none p-4 font-light"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="diary-theme">다이어리 주제</Label>
          <Input
            ref={themeInput}
            id="diary-theme"
            name="diary-theme"
            placeholder="주제를 적어주세요"
            value={diaryThemeInput}
            onChange={handleThemeChange}
            onKeyUp={handleThemeKeyDown}
            className="w-full h-12 bg-slate-100 border-none p-4 font-light"
          />
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {diaryTheme.map((chip, index) => (
            <div
              key={index}
              className="flex items-center bg-slate-200 px-3 py-1 rounded-lg text-sm"
            >
              {chip}
              <button
                onClick={() => removeChip(index)}
                className="ml-2 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* {diaryName && diaryTheme.length > 0 && diaryCover && ( */}
        <section className="w-full mt-auto">
          <Button
            className="w-full h-12 rounded-2xl bg-app-primary-100"
            onClick={() => {
              if (!isPending && allSet()) {
                mutate();
              }
            }}
            disabled={isPending}
          >
            다이어리 생성하기
          </Button>
        </section>
      {/* )} */}
    </main>
  );
}

"use client";

import { ImageSvg, SmileSvg, WeatherSvg } from "@/app/assets/icons";
import ArrowDownSvg from "@/app/assets/icons/ArrowDown.svg";
import ArrowLeftSvg from "@/app/assets/icons/ArrowLeft.svg";
import useDiaries from "@/app/hooks/useDiaries";
import useImageUpload from "@/app/hooks/useImageUpload";
import useNoteCommonCreate from "@/app/hooks/useNoteCreate";
import BottomSheetSelect from "@/components/BottomSheet/Select";
import QuillEditor from "@/components/Editor";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import Quill from "quill";
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";

type Emoji = {
  icon: string;
  text: string;
};

const emojis = [
  { icon: "🥰", text: "기쁨" },
  { icon: "😊", text: "만족" },
  { icon: "😀", text: "행복" },
  { icon: "🙂", text: "보통" },
  { icon: "🤔", text: "불만" },
  { icon: "🤬", text: "분노" },
  { icon: "🫠", text: "피곤" },
  { icon: "🥲", text: "슬픔" },
];

const weathers = [
  { icon: "☀️", text: "화창" },
  { icon: "☁️", text: "흐림" },
  { icon: "🌤️", text: "맑음" },
  { icon: "🌥️", text: "구름맑음" },
  { icon: "❄️", text: "눈" },
  { icon: "⚡️", text: "천둥번개" },
  { icon: "💨", text: "비바람" },
  { icon: "☔️", text: "비" },
];

export default function Page() {
  const { array } = useDiaries();
  const items = array?.map((diary) => {
    return {
      id: diary.id,
      key: String(diary.id),
      text: diary.title,
    };
  });
  const [diary, setDiary] = useState<{
    id: number;
    text: string;
    key: string;
  }>();
  const [textLength, setTextLength] = useState(0);
  const editorRef = useRef<Quill | null>(null);
  const { mutateAsync } = useImageUpload();
  const { mutateAsync: onNoteCreate } = useNoteCommonCreate();
  const [emoji, setEmoji] = useState<Emoji>();
  const [weather, setWeather] = useState<Emoji>();

  const onFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const files = Array.from(event.target.files ?? []);
    const responses = await Promise.allSettled(
      files.map(async (file) => {
        return mutateAsync({ file, filename: file.name });
      })
    );
    for (const response of responses) {
      if (response.status === "fulfilled" && editorRef.current) {
        editorRef.current.insertEmbed(
          editorRef.current.getLength(),
          "image",
          response.value.url
        );
      }
    }
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    if (diary) {
      const { id } = await onNoteCreate(diary.id);
    }
  };

  return (
    <div className="w-full h-full flex flex-col max-w-[412px] border-x border">
      <div className="w-full h-full flex flex-col overflow-y-scroll relative">
        <div className="w-full h-14 p-1 flex justify-between">
          <button className="p-0 w-12 h-12 flex justify-center items-center bg-white">
            <ArrowLeftSvg className="text-app-gray-1100 !w-6 !h-6" />
          </button>
          <button
            className="flex items-center bg-white h-12 p-3 pr-4"
            onClick={onSubmit}
          >
            <h4 className="text-sub4 text-app-gray-1100">완료</h4>
          </button>
        </div>
        <Sheet>
          <SheetTrigger>
            <div className="w-full h-14 flex gap-x-2.5 items-center px-5 py-4">
              {!diary && (
                <h2 className="w-full text-body2 text-app-gray-700 text-start line-clamp-1">
                  다이어리를 선택해주세요.
                </h2>
              )}
              {diary && (
                <h2 className="w-full text-body2 text-app-gray-700 text-start line-clamp-1">
                  {diary.text}
                </h2>
              )}
              <ArrowDownSvg className="flex shrink-0" />
            </div>
          </SheetTrigger>
          <BottomSheetSelect
            title="다이어리 선택"
            items={items || []}
            side="bottom"
            itemClassName="bg-white"
            className="bg-white"
            onClick={(item) => {
              setDiary(item);
            }}
          />
        </Sheet>
        <div className="w-full h-px bg-app-gray-400" />
        <div className="flex w-full h-[54px] items-center px-5 py-4">
          <input className="!text-h2 w-full text-app-gray-700 p-0 outline-none" />
        </div>
        <div className="w-full bg-white flex flex-col">
          <QuillEditor
            forwardedRef={editorRef}
            readOnly={false}
            defaultValue={[]}
            onSelectionChange={() => {}}
            onTextChange={() => {
              setTextLength(editorRef.current?.getLength() ?? 0);
            }}
          />
        </div>
      </div>
      <div className="w-full h-14 flex shrink-0 border-t border-app-gray-400 px-5 gap-x-3">
        <label
          className="cursor-pointer flex items-center"
          htmlFor="noteImages"
        >
          <ImageSvg />
        </label>
        <input
          type="file"
          accept="image/*"
          name="noteImages"
          multiple
          id="noteImages"
          className="hidden"
          onChange={onFileChange}
        />
        <Sheet>
          <SheetTrigger>{emoji ? emoji.icon : <SmileSvg />}</SheetTrigger>
          <SheetContent className="w-full flex justify-center" side={"bottom"}>
            <SheetTitle className="invisible"></SheetTitle>
            <div className="grid grid-cols-4 gap-1 w-full max-w-[412px]">
              {emojis.map((emoji) => {
                return (
                  <SheetClose
                    key={emoji.text}
                    onClick={() => {
                      setEmoji(emoji);
                    }}
                  >
                    <div className="flex flex-col items-center h-[96px] justify-center gap-y-3">
                      <span>{emoji.icon}</span>
                      <span className="text-body2">{emoji.text}</span>
                    </div>
                  </SheetClose>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>{weather ? weather.icon : <WeatherSvg />}</SheetTrigger>
          <SheetContent className="w-full flex justify-center" side={"bottom"}>
            <SheetTitle className="invisible"></SheetTitle>
            <div className="grid grid-cols-4 gap-1 w-full max-w-[412px]">
              {weathers.map((weather) => {
                return (
                  <SheetClose
                    key={weather.text}
                    onClick={() => {
                      setWeather(weather);
                    }}
                  >
                    <div className="flex flex-col items-center h-[96px] justify-center gap-y-3">
                      <span>{weather.icon}</span>
                      <span className="text-body2">{weather.text}</span>
                    </div>
                  </SheetClose>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-full flex items-center justify-end">
          <h5 className="text-sub5">{format("2024-12-01", "yyyy-MM-dd")}</h5>
        </div>
        <div className="flex items-center w-[100px] gap-x-3">
          <h5 className="text-sub5 whitespace-nowrap">겨울</h5>
          <p className="text-body3 whitespace-nowrap">{textLength}/1000</p>
        </div>
      </div>
    </div>
  );
}
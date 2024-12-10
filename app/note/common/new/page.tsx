"use client";

import { ImageSvg, SmileSvg, WeatherSvg } from "@/app/assets/icons";
import ArrowDownSvg from "@/app/assets/icons/ArrowDown.svg";
import ArrowLeftSvg from "@/app/assets/icons/ArrowLeft.svg";
import useDiaryNames from "@/app/hooks/useDiaryNames";
import useImageUpload from "@/app/hooks/useImageUpload";
import useNoteCommonCreate from "@/app/hooks/useNoteCreate";
import { CalendarDayType, CalendarLibs } from "@/app/lib/calendar";
import { Emoji, NoteLibs } from "@/app/lib/note";
import AppCalendar from "@/components/AppCalendar";
import AppCalendarDay from "@/components/AppCalendar/Day";
import BottomSheetV2 from "@/components/BottomSheet/v2";
import QuillEditor from "@/components/Editor";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Quill from "quill";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";

export default function Page() {
  const { data } = useDiaryNames();
  const [diary, setDiary] = useState<{
    id: number;
    name: string;
  }>();
  const now = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(now);

  const [textLength, setTextLength] = useState(0);
  const editorRef = useRef<Quill | null>(null);
  const { mutateAsync } = useImageUpload();
  const { mutateAsync: onNoteCreate } = useNoteCommonCreate();
  const [emoji, setEmoji] = useState<Emoji>();
  const [weather, setWeather] = useState<Emoji>();
  const [title, setTitle] = useState<string>();
  const router = useRouter();

  const season = NoteLibs.createSeason(selectedDate);

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
    if (editorRef.current) {
      const content = editorRef.current.getSemanticHTML();
      await onNoteCreate({
        diaryId: diary?.id,
        title,
        emoji,
        weather,
        season,
        date: selectedDate,
        content,
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col max-w-[412px] border-x border">
      <div className="w-full h-full flex flex-col overflow-y-scroll relative">
        <div className="w-full h-14 p-1 flex justify-between">
          <button
            className="p-0 w-12 h-12 flex justify-center items-center bg-white"
            onClick={() => {
              router.back();
            }}
          >
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
                  {diary.name}
                </h2>
              )}
              <ArrowDownSvg className="flex shrink-0" />
            </div>
          </SheetTrigger>
          <BottomSheetV2 className="gap-y-6 bg-white">
            <BottomSheetV2.Header>
              <h2 className="text-h2 text-app-gray-1000">다이어리 선택</h2>
            </BottomSheetV2.Header>
            {data?.nameList?.map((item) => {
              return (
                <BottomSheetV2.Option key={item.id}>
                  <SheetClose asChild>
                    <button
                      className="bg-white flex items-center justify-center text-sub4 text-app-gray-1100 h-12"
                      onClick={() => {
                        setDiary({
                          id: item.id,
                          name: item.name,
                        });
                      }}
                    >
                      {item.name}
                    </button>
                  </SheetClose>
                </BottomSheetV2.Option>
              );
            })}
          </BottomSheetV2>
        </Sheet>
        <div className="w-full h-px bg-app-gray-400" />
        <div className="flex w-full h-[54px] items-center px-5 py-4">
          <input
            className="!text-h2 w-full text-app-gray-700 p-0 outline-none"
            type="text"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
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
              {NoteLibs.getEmojis().map((emoji) => {
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
              {NoteLibs.getWeathers().map((weather) => {
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
          <Sheet>
            <SheetTrigger>
              <h5 className="text-sub5">
                {format(selectedDate, "yyyy-MM-dd")}
              </h5>
            </SheetTrigger>
            <SheetContent
              className="w-full flex justify-center"
              side={"bottom"}
            >
              <SheetTitle className="hidden" />
              <div className="w-full max-w-[412px]">
                <AppCalendar.Container defaultDate={now}>
                  <AppCalendar.Header
                    classNames={{
                      text: "text-app-gray-900",
                      prevIcon: "text-app-gray-900",
                      nextIcon: "text-app-gray-900",
                    }}
                  />
                  <AppCalendar.WeekDay />
                  <AppCalendar.BodyContainer>
                    <AppCalendar.Body background={false}>
                      {({ date }) => {
                        const isSelected = CalendarLibs.isDateEqual(
                          date.date,
                          selectedDate
                        );
                        const isNow = CalendarLibs.isDateEqual(date.date, now);
                        const isNone = !date.inMonth;
                        let type = CalendarDayType.DISABLED;
                        if (isSelected) {
                          type = CalendarDayType.SELECTED;
                        } else if (isNow) {
                          type = CalendarDayType.TODAY;
                        } else if (isNone) {
                          type = CalendarDayType.NONE;
                        }
                        if (type === CalendarDayType.NONE) {
                          return (
                            <AppCalendarDay.Sheet day={date.date} type={type} />
                          );
                        }
                        return (
                          <SheetClose>
                            <AppCalendarDay.Sheet
                              day={date.date}
                              type={type}
                              onClick={() => {
                                setSelectedDate(date.date);
                              }}
                            />
                          </SheetClose>
                        );
                      }}
                    </AppCalendar.Body>
                  </AppCalendar.BodyContainer>
                </AppCalendar.Container>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center w-[100px] gap-x-3">
          <h5 className="text-sub5 whitespace-nowrap">{season}</h5>
          <p className="text-body3 whitespace-nowrap">{textLength}/1000</p>
        </div>
      </div>
    </div>
  );
}

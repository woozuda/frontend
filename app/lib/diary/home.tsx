import {
  CalendarDotSvg,
  PencilFlatSvg,
  RetrospectSvg,
} from "@/app/assets/icons";

export class DiaryHomeLibs {
  static popoverItems = [
    {
      name: "일기 쓰기",
      href: "/note/common/new",
      icon: <PencilFlatSvg />,
    },
    {
      name: "오늘의 질문 일기",
      href: "/note/question/new",
      icon: <CalendarDotSvg />,
    },
    {
      name: "회고하기",
      href: "/note/retrospect/new",
      icon: <RetrospectSvg />,
    },
  ];
}

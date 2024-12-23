import { CreateNoteProps } from "@/app/hooks/useNoteCreate";
import { NoteAPI } from "@/app/http";
import { ReportAPI } from "@/app/http/report";
import { DiaryNote, RetrospectiveEnums } from "@/app/models/diary";
import { QueryClient } from "@tanstack/react-query";
import { addDays, endOfWeek, getMonth, startOfWeek } from "date-fns";
import { HTMLLibs } from "../html";
import { Http } from "../http";
import { ReportLibs } from "../report";

export enum NoteSeason {
  SPRING = "봄",
  SUMMER = "여름",
  FALL = "가을",
  WINTER = "겨울",
}

export type Emoji = {
  icon: string;
  text: string;
};

const emojis: Emoji[] = [
  { icon: "🥰", text: "기쁨" },
  { icon: "😊", text: "만족" },
  { icon: "😀", text: "행복" },
  { icon: "🙂", text: "보통" },
  { icon: "🤔", text: "불만" },
  { icon: "🤬", text: "분노" },
  { icon: "🫠", text: "피곤" },
  { icon: "🥲", text: "슬픔" },
];

const weathers: Emoji[] = [
  { icon: "☀️", text: "화창" },
  { icon: "☁️", text: "흐림" },
  { icon: "🌤️", text: "맑음" },
  { icon: "🌥️", text: "구름맑음" },
  { icon: "❄️", text: "눈" },
  { icon: "⚡️", text: "천둥번개" },
  { icon: "💨", text: "비바람" },
  { icon: "☔️", text: "비" },
];

export class NoteLibs {
  static isSpring(monthIndex: number, isNorth: boolean = true) {
    const month = monthIndex + 1;
    return isNorth ? month >= 3 && month <= 5 : month >= 9 && month <= 11;
  }
  static isSummer(monthIndex: number, isNorth: boolean = true) {
    const month = monthIndex + 1;
    return isNorth ? month >= 6 && month <= 8 : month >= 12 || month <= 2;
  }
  static isFall(monthIndex: number, isNorth: boolean = true) {
    const month = monthIndex + 1;
    return isNorth ? month >= 9 && month <= 11 : month >= 3 && month <= 5;
  }
  static isWinter(monthIndex: number, isNorth: boolean = true) {
    const month = monthIndex + 1;
    return isNorth ? month >= 12 || month <= 2 : month >= 6 && month <= 8;
  }
  static createSeason(date: Date, isNorth: boolean = true) {
    const month = getMonth(date);

    if (NoteLibs.isSpring(month, isNorth)) {
      return NoteSeason.SPRING;
    }
    if (NoteLibs.isSummer(month, isNorth)) {
      return NoteSeason.SUMMER;
    }
    if (NoteLibs.isFall(month, isNorth)) {
      return NoteSeason.FALL;
    }
    if (NoteLibs.isWinter(month, isNorth)) {
      return NoteSeason.WINTER;
    }
  }

  static getEmojis() {
    return emojis;
  }

  static getWeathers() {
    return weathers;
  }

  static findFeeling(text: string) {
    return emojis.find((emoji) => emoji.text === text);
  }

  static findWeather(text: string) {
    return weathers.find((weather) => weather.text === text);
  }

  static groupNotes(notes: DiaryNote[][]) {
    const reducedNotes = notes.flat().reduce((record, note) => {
      const date = note.note.date;
      if (!(date in record)) {
        record[date] = [];
      }
      record[date].push(note);
      return record;
    }, {} as Record<string, DiaryNote[]>);

    return Object.entries(reducedNotes);
  }
  static getContent(content: string) {
    const doc = HTMLLibs.createDocument(content);
    return HTMLLibs.reduceElements(doc);
  }

  static async fetchCountOnSuccess(queryClient: QueryClient, date: Date) {
    const http = new Http({
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    if (process.env.NEXT_PUBLIC_BASE_URL) {
      http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    }
    const noteApi = new NoteAPI(http);
    const startDate = ReportLibs.toDateParam(addDays(startOfWeek(date), 1));
    const endDate = ReportLibs.toDateParam(addDays(endOfWeek(date), 1));
    const countQueryKey = ["NOTE_COUNT", startDate, endDate] as const;
    const response = await queryClient.fetchQuery({
      queryKey: countQueryKey,
      queryFn: ({ queryKey }) => {
        const [, startDate, endDate] = queryKey;
        return noteApi.getNoteCount(startDate, endDate);
      },
    });
    return response;
  }

  static async fetchReportDiaryOnSuccess(
    queryClient: QueryClient,
    variables: CreateNoteProps
  ) {
    const http = new Http({
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    if (process.env.NEXT_PUBLIC_BASE_URL) {
      http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    }
    const reportApi = new ReportAPI(http);
    const startDate = ReportLibs.toDateParam(
      addDays(startOfWeek(variables.date), 1)
    );
    const endDate = ReportLibs.toDateParam(
      addDays(endOfWeek(variables.date), 1)
    );
    const reportQueryKey = [
      "DIARY_ANALYSIS",
      startDate,
      endDate,
      "DIARY",
    ] as const;
    const hasReportDiary = await queryClient.fetchQuery({
      queryKey: reportQueryKey,
      queryFn: async ({ queryKey }) => {
        const [, startDate, endDate] = queryKey;
        const response = await reportApi.getReportDiary(startDate, endDate);
        return response.ok;
      },
    });

    return hasReportDiary;
  }

  static async fetchReportRetrospectiveOnSuccess(
    queryClient: QueryClient,
    date: Date,
    type: RetrospectiveEnums
  ) {
    const http = new Http({
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    if (process.env.NEXT_PUBLIC_BASE_URL) {
      http.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    }
    const reportApi = new ReportAPI(http);
    const startDate = ReportLibs.toDateParam(addDays(startOfWeek(date), 1));
    const endDate = ReportLibs.toDateParam(addDays(endOfWeek(date), 1));
    const reportQueryKey = [
      "DIARY_ANALYSIS",
      startDate,
      endDate,
      type,
    ] as const;
    const hasReportDiary = await queryClient.fetchQuery({
      queryKey: reportQueryKey,
      queryFn: async ({ queryKey }) => {
        const [, start, end, type] = queryKey;
        let response: Response | null = null;
        switch (type) {
          case RetrospectiveEnums.FOUR_F_S:
            response = await reportApi.getReport4FS(start, end);
          case RetrospectiveEnums.KPT:
            response = await reportApi.getReportKPT(start, end);
          case RetrospectiveEnums.PMI:
            response = await reportApi.getReportPMI(start, end);
          case RetrospectiveEnums.SCS:
            response = await reportApi.getReportSCS(start, end);
        }
        return response ? response.ok : null;
      },
    });

    return hasReportDiary;
  }
}

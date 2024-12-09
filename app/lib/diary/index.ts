import { format } from "date-fns";

export enum DiaryListType {
  DEFAULT = "default",
  DATES = "dates",
  LATEST = "latest",
}

export enum DiaryActionType {
  DEFAULT = "default",
  DELETE = "delete",
  SHARE = "share",
}

export class DiaryLibs {
  static getListType(searchParams: URLSearchParams) {
    const type = searchParams.get("type");
    switch (type) {
      case DiaryListType.DEFAULT:
      case null:
      case undefined:
        return DiaryListType.DEFAULT;
      case DiaryListType.DATES:
        return DiaryListType.DATES;
      case DiaryListType.LATEST:
        return DiaryListType.LATEST;
      default:
        return DiaryListType.DEFAULT;
    }
  }

  static getPageTypes() {
    return [
      {
        key: DiaryListType.DEFAULT,
        text: "다이어리 목록으로 보기",
        href: `/diary`,
      },
      {
        key: DiaryListType.DATES,
        text: "달력으로 보기",
        href: `/diary?type=${DiaryListType.DATES}`,
      },
      {
        key: DiaryListType.LATEST,
        text: "최신순으로 보기",
        href: `/diary?type=${DiaryListType.LATEST}`,
      },
    ];
  }

  static groupDates(dates: { date: string; count: number }[]) {
    const obj = dates.reduce((record, date) => {
      const key = format(date.date, "yyyy-MM");
      if (!(key in record)) {
        record[key] = {};
      }
      record[key][format(date.date, "yyyy-MM-dd")] = {
        count: date.count,
        date: new Date(date.date),
      };
      return record;
    }, {} as Record<string, Record<string, { count: number; date: Date }>>);

    return Object.entries(obj);
  }
}

export * from "./home";

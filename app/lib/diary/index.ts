import { format } from "date-fns";

export enum DiaryListType {
  DEFAULT = "default",
  DATES = "dates",
  NOTES = "notes",
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
      case DiaryListType.NOTES:
        return DiaryListType.NOTES;
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
        key: DiaryListType.NOTES,
        text: "최신순으로 보기",
        href: `/diary?type=${DiaryListType.NOTES}`,
      },
    ];
  }

  static groupDates(dates: { id: number; date: string }[]) {
    const obj = dates.reduce((record, date) => {
      const key = format(date.date, "yyyy-MM");
      if (!(key in record)) {
        record[key] = {};
      }
      record[key][format(date.date, "yyyy-MM-dd")] = {
        id: date.id,
        date: new Date(date.date),
      };
      return record;
    }, {} as Record<string, Record<string, { id: number; date: Date }>>);

    return Object.entries(obj);
  }
}

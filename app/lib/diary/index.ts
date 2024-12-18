import { DiaryResponse } from "@/app/http/diary";
import { Diary, DiaryNote } from "@/app/models/diary";
import { InfiniteData } from "@tanstack/react-query";
import { format } from "date-fns";
import { isNil } from "ramda";

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
  static getDiaryDate(searchParams: URLSearchParams) {
    const date = searchParams.get("date");

    return date;
  }
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

  static groupNotes(data: InfiniteData<Diary | null, unknown> | undefined) {
    if (isNil(data)) {
      return null;
    }
    const contents = data.pages.flatMap((page) => page?.notes);
    const array = contents.reduce((record, content) => {
      if (!content) {
        return record;
      }
      const key = format(content.note.date, "yyyy-MM-dd");
      if (!(key in record)) {
        record[key] = [];
      }
      record[key].push(content);
      return record;
    }, {} as Record<string, DiaryNote[]>);

    return Object.entries(array);
  }

  static fromResponse(response: DiaryResponse): Diary {
    const { id, title, subject, imgUrl, startDate, endDate, noteCount, page } =
      response;
    const { content, last, pageable, totalElements, totalPages } = page;
    const diary = {
      id,
      title,
      subject,
      imgUrl,
      startDate,
      endDate,
      noteCount,
    } as Partial<Diary>;
    diary.notes = content;
    diary.last = last;
    diary.offset = pageable.offset;
    diary.pageNumber = pageable.offset;
    diary.pageSize = pageable.pageSize;
    diary.totalElements = totalElements;
    diary.totalPages = totalPages;
    return diary as Diary;
  }
}

export * from "./home";

import { RetrospectEnums } from "@/app/models/report";
import {
  addWeeks,
  endOfWeek,
  format,
  getWeekOfMonth,
  isValid,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { ReadonlyURLSearchParams } from "next/navigation";
import { isNil } from "ramda";

export enum ReportEnums {
  COMMON = "common",
  RETROSPECTIVE = "retrospective",
  CREATION = "creation",
}

export class ReportLibs {
  static getTabStyle(type: ReportEnums, param?: ReportEnums) {
    if (type === ReportEnums.COMMON && param === undefined) {
      return {
        tab: "h-12 flex w-full items-center justify-center border-b-2 border-white",
        text: "text-sub4 text-white",
      };
    }
    if (type === param) {
      return {
        tab: "h-12 flex w-full items-center justify-center border-b-2 border-white",
        text: "text-sub4 text-white",
      };
    } else {
      return {
        tab: "h-12 flex w-full items-center justify-center border-b-2 border-app-gray-700",
        text: "text-sub4 text-app-gray-700",
      };
    }
  }

  static getPeriod(searchParams: URLSearchParams): [Date, Date] {
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (isNil(start) || isNil(end) || isValid(start) || isValid(end)) {
      const now = new Date();
      return [startOfWeek(now), endOfWeek(now)];
    } else {
      return [new Date(start), new Date(end)];
    }
  }

  static getWeekNumber(start: Date, end: Date): [Date, number] {
    if (start.getMonth() === end.getMonth()) {
      return [start, getWeekOfMonth(start)];
    } else {
      return [end, 1];
    }
  }

  static getWeekText(date: Date, week: number) {
    const text = `${format(date, "MM")}월 ${String(week).padStart(1, "0")}주차`;

    return text;
  }

  static createPrevHref(
    pathname: string,
    searchParams: ReadonlyURLSearchParams,
    start: Date,
    end: Date
  ) {
    const prevStart = subWeeks(start, 1);
    const prevEnd = subWeeks(end, 1);

    const prevParams = new URLSearchParams(searchParams);
    prevParams.set("start", format(prevStart, "yyyy-MM-dd"));
    prevParams.set("end", format(prevEnd, "yyyy-MM-dd"));

    return `${pathname}?${prevParams.toString()}`;
  }

  static createNextHref(
    pathname: string,
    searchParams: ReadonlyURLSearchParams,
    start: Date,
    end: Date
  ) {
    const nextStart = addWeeks(start, 1);
    const nextEnd = addWeeks(end, 1);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("start", format(nextStart, "yyyy-MM-dd"));
    nextParams.set("end", format(nextEnd, "yyyy-MM-dd"));

    return `${pathname}?${nextParams.toString()}`;
  }

  static toDateParam(date: Date) {
    return format(date, "yyyy-MM-dd");
  }

  static getChipText(type: RetrospectEnums) {
    if (type === RetrospectEnums.FOUR_F_S) {
      return "4FS";
    }
    return type;
  }

  static getRetrospectType(searchParams: ReadonlyURLSearchParams) {
    const type = searchParams.get("type");

    switch (type) {
      case RetrospectEnums.FOUR_F_S: {
        return RetrospectEnums.FOUR_F_S;
      }
      case RetrospectEnums.KPT: {
        return RetrospectEnums.KPT;
      }
      case RetrospectEnums.PMI: {
        return RetrospectEnums.PMI;
      }
      case RetrospectEnums.SCS: {
        return RetrospectEnums.SCS;
      }
      default: {
        return RetrospectEnums.FOUR_F_S;
      }
    }
  }
}

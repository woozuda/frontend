import {
  addDays,
  endOfMonth,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { ko } from "date-fns/locale";
import { MonthDay } from "./types";

export enum CalendarDayType {
  DISABLED = "disabled",
  ABLED = "abled",
  TODAY = "today",
  SELECTED = "selected",
  NONE = "none",
}

export enum CalendarStageType {
  DEFAULT = "default",
  CREATE = "create",
}

type GetCalendarTypeProps = {
  now?: Date;
  diaries?: Date[];
  selectedDate?: Date;
  stage?: CalendarStageType;
};

export class CalendarLibs {
  static createWeekNames(date: Date, formatter: string = "E") {
    const WEEKDAY = 7;
    const from = startOfWeek(date);
    const fromDay = from.getDay();

    const array: string[] = [];
    for (let index = fromDay; index < WEEKDAY; index++) {
      const add = index - fromDay;
      const date = addDays(from, add);
      array.push(format(date, formatter, { locale: ko }));
    }
    return array;
  }

  static isDateEqual(from: Date, to: Date) {
    return (
      from.getFullYear() === to.getFullYear() &&
      from.getMonth() === to.getMonth() &&
      from.getDate() === to.getDate()
    );
  }

  static createMonthDays(date: Date) {
    const WEEKDAY = 7;
    const from = startOfMonth(date);
    const end = endOfMonth(date);
    const array = [] as MonthDay[];

    const fromDay = from.getDay();
    const fromDate = from.getDate();
    const endDay = end.getDay();
    const endDate = end.getDate();

    for (let index = 0; index < fromDay; index++) {
      const sub = fromDay - index;
      const date = subDays(from, sub);
      array.push({ date, inMonth: false, key: format(date, "yyyy-MM-dd") });
    }

    for (let index = fromDate; index <= endDate; index++) {
      const add = index - fromDate;
      const date = addDays(from, add);
      array.push({ date, inMonth: true, key: format(date, "yyyy-MM-dd") });
    }
    if (endDay !== 6) {
      for (let index = endDay + 1; index < WEEKDAY; index++) {
        const add = index - endDay;
        const date = addDays(end, add);
        array.push({ date, inMonth: false, key: format(date, "yyyy-MM-dd") });
      }
    }

    const len = Math.floor(array.length / 7);
    const matrix = [] as { array: MonthDay[]; key: string }[];
    for (let index = 0; index < len; index++) {
      const subArray = array.slice(index * WEEKDAY, (index + 1) * WEEKDAY);

      const subFrom = subArray[0];
      const subTo = subArray[subArray.length - 1];
      const subKey =
        format(subFrom.date, "yyyy-MM-dd") +
        " ~ " +
        format(subTo.date, "yyyy-MM-dd");
      matrix.push({ array: subArray, key: subKey });
    }

    return { array, matrix };
  }

  static createWeekDays(date: Date) {
    const WEEKDAY = 7;
    const from = startOfWeek(date);
    const array = [] as MonthDay[];

    const fromDay = from.getDay();

    for (let index = 0; index < WEEKDAY; index++) {
      const add = index - fromDay;
      const date = addDays(from, add);
      array.push({ date, inMonth: true, key: format(date, "yyyy-MM-dd") });
    }

    return array;
  }

  static hasDateDiary(element: Date, sources: Date[]) {
    return sources.find((date) => CalendarLibs.isDateEqual(element, date));
  }

  static isDateSelected(element: Date, sources: Date[], target?: Date) {
    if (target === undefined) {
      return false;
    }
    return (
      sources.find((date) => CalendarLibs.isDateEqual(date, element)) &&
      CalendarLibs.isDateEqual(element, target)
    );
  }

  static getCalendarType(day: MonthDay, option?: GetCalendarTypeProps) {
    const isToday =
      option && option.now
        ? CalendarLibs.isDateEqual(day.date, option.now)
        : false;
    const isSelected =
      option && option.selectedDate
        ? CalendarLibs.isDateEqual(day.date, option.selectedDate)
        : false;
    const hasDiary = CalendarLibs.hasDateDiary(
      day.date,
      option && option.diaries ? option.diaries : []
    );
    const type = isSelected
      ? CalendarDayType.SELECTED
      : hasDiary && option && option.stage === CalendarStageType.DEFAULT
      ? CalendarDayType.ABLED
      : isToday
      ? CalendarDayType.TODAY
      : day.inMonth
      ? CalendarDayType.DISABLED
      : CalendarDayType.NONE;
    return type;
  }
}

import { CalendarDayType } from "@/app/lib/calendar";
import { format } from "date-fns";

import StarSvg from "@/app/assets/icons/Star.svg";
import Link from "next/link";
import { MouseEventHandler } from "react";

export interface AppCalendarDayProps {
  day: Date;
  type?: CalendarDayType;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

export const AppCalendarDayDefault = (props: AppCalendarDayProps) => {
  const { day, href = "/", type = CalendarDayType.DISABLED, onClick } = props;

  switch (type) {
    case CalendarDayType.DISABLED: {
      return (
        <div
          className="w-[34px] h-[34px] flex justify-center items-center"
          role="button"
          onClick={onClick}
        >
          <span className="text-sub4 text-app-gray-900">
            {format(day, "dd")}
          </span>
        </div>
      );
    }
    case CalendarDayType.ABLED: {
      return (
        <Link
          href={href}
          className="w-[34px] h-[34px] flex justify-center items-center"
        >
          <StarSvg className="text-white" />
        </Link>
      );
    }
    case CalendarDayType.TODAY: {
      return (
        <Link
          href={href}
          className="w-[34px] h-[34px] flex justify-center items-center rounded-[20px] bg-app-primary-200"
        >
          <span className="text-sub4 text-white">{format(day, "dd")}</span>
        </Link>
      );
    }
    case CalendarDayType.SELECTED: {
      return (
        <div className="w-[34px] h-[34px] flex justify-center items-center rounded-[20px] bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 from-[20%]">
          <span className="text-sub4 text-app-gray-1200">
            {format(day, "dd")}
          </span>
        </div>
      );
    }
    case CalendarDayType.NONE: {
      return (
        <div className="w-[34px] h-[34px] flex justify-center items-center" />
      );
    }
    default: {
      return (
        <div className="w-[34px] h-[34px] flex justify-center items-center">
          <span className="text-sub4 text-app-gray-900">
            {format(day, "dd")}
          </span>
        </div>
      );
    }
  }
};

export const AppCalendarSheetDay = (props: AppCalendarDayProps) => {
  const { day, type = CalendarDayType.DISABLED, onClick } = props;

  switch (type) {
    case CalendarDayType.DISABLED: {
      return (
        <div
          className="w-[34px] h-[34px] flex justify-center items-center"
          onClick={onClick}
        >
          <span className="text-sub4 text-app-gray-900">
            {format(day, "dd")}
          </span>
        </div>
      );
    }
    case CalendarDayType.TODAY: {
      return (
        <div
          className="w-[34px] h-[34px] flex justify-center items-center rounded-[20px] bg-app-primary-200"
          onClick={onClick}
        >
          <span className="text-sub4 text-white">{format(day, "dd")}</span>
        </div>
      );
    }
    case CalendarDayType.SELECTED: {
      return (
        <div
          className="w-[34px] h-[34px] flex justify-center items-center rounded-[20px] bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 from-[20%]"
          onClick={onClick}
        >
          <span className="text-sub4 text-app-gray-1200">
            {format(day, "dd")}
          </span>
        </div>
      );
    }
    case CalendarDayType.NONE: {
      return (
        <div className="w-[34px] h-[34px] flex justify-center items-center" />
      );
    }
    default: {
      return (
        <div
          className="w-[34px] h-[34px] flex justify-center items-center"
          onClick={onClick}
        >
          <span className="text-sub4 text-app-gray-900">
            {format(day, "dd")}
          </span>
        </div>
      );
    }
  }
};

export const AppCalendarDayCreate = (props: AppCalendarDayProps) => {
  const { day, type = CalendarDayType.DISABLED, onClick } = props;

  switch (type) {
    case CalendarDayType.DISABLED: {
      return (
        <button
          className="w-[34px] h-[34px] flex justify-center items-center"
          onClick={onClick}
        >
          <span className="text-sub4 text-app-gray-900">
            {format(day, "dd")}
          </span>
        </button>
      );
    }
    case CalendarDayType.TODAY: {
      return (
        <button
          className="w-[34px] h-[34px] flex justify-center items-center rounded-[20px] bg-app-primary-200"
          onClick={onClick}
        >
          <span className="text-sub4 text-white">{format(day, "dd")}</span>
        </button>
      );
    }
    case CalendarDayType.SELECTED: {
      return (
        <div className="w-[34px] h-[34px] flex justify-center items-center rounded-[20px] bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 from-[20%]">
          <span className="text-sub4 text-app-gray-1200">
            {format(day, "dd")}
          </span>
        </div>
      );
    }
    case CalendarDayType.NONE: {
      return (
        <div className="w-[34px] h-[34px] flex justify-center items-center" />
      );
    }
    default: {
      return (
        <button
          className="w-[34px] h-[34px] flex justify-center items-center rounded-[20px] bg-app-primary-200"
          onClick={onClick}
        >
          <span className="text-sub4 text-app-gray-900">
            {format(day, "dd")}
          </span>
        </button>
      );
    }
  }
};

const AppCalendarDay = Object.assign(
  {},
  {
    Default: AppCalendarDayDefault,
    Create: AppCalendarDayCreate,
    Sheet: AppCalendarSheetDay,
  }
);

export default AppCalendarDay;

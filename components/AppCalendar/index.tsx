import { ClassNameLibs } from "@/lib/utils";
import { addMonths, format, startOfDay, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import {
  createContext,
  forwardRef,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

import ArrowLeftSvg from "@/app/assets/icons/ArrowLeftSmall.svg";
import ArrowRightSvg from "@/app/assets/icons/ArrowRightSmall.svg";
import XMarkSvg from "@/app/assets/icons/XMark.svg";
import { CalendarLibs, CalendarStageType } from "@/app/lib/calendar";
import AppCalendarDay from "./Day";

interface AppCalendarContextType {
  date: Date;
  selectedDate?: Date;
  close?: boolean;
  onChange?: (date: Date) => unknown;
  onHeaderClick?: MouseEventHandler<HTMLElement>;
  onNextClick: () => unknown;
  onPrevClick: () => unknown;
}

const AppCalendarContext = createContext<AppCalendarContextType>(null!);

export interface AppCalendarHeaderProps {
  hasClose: boolean;
  date: Date;
  onPrevClick: () => unknown;
  onNextClick: () => unknown;
  onClose?: () => unknown;
}

const AppCalendarHeader = () => {
  const { date, close, onNextClick, onPrevClick, onHeaderClick } =
    useContext(AppCalendarContext);
  const text = format(date, "yyyy년 MM월", { locale: ko });

  if (!close) {
    return (
      <div className="flex justify-center p-1 h-[56px] max-w-[412px]">
        <div className="p-3 gap-x-3 flex items-center">
          <button
            onClick={() => onPrevClick()}
            className="w-6 h-6 flex justify-center items-center text-app-gray-400"
          >
            <ArrowLeftSvg />
          </button>
          <h3
            className="text-sub3 text-app-gray-1000"
            onClick={(event) => {
              onHeaderClick?.(event);
            }}
          >
            {text}
          </h3>
          <button
            onClick={() => onNextClick()}
            className="w-6 h-6 flex justify-center items-center text-app-gray-400"
          >
            <ArrowRightSvg />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between p-1 h-[56px] w-full items-center max-w-[412px]">
        <div className="w-10 h-10" />
        <div className="p-3 gap-x-3 flex items-center">
          <button
            onClick={() => onPrevClick()}
            className="w-6 h-6 flex justify-center items-center text-app-gray-400"
          >
            <ArrowLeftSvg />
          </button>
          <h3 className="text-sub3 text-app-gray-1000">{text}</h3>
          <button
            onClick={() => onNextClick()}
            className="w-6 h-6 flex justify-center items-center text-app-gray-400"
          >
            <ArrowRightSvg />
          </button>
        </div>
        <button className="w-10 h-10 flex justify-center items-center text-app-gray-400">
          <XMarkSvg />
        </button>
      </div>
    );
  }
};

const AppCalendarShortBody = () => {
  const { date, selectedDate } = useContext(AppCalendarContext);
  const weekDays = CalendarLibs.createWeekNames(date);
  const array = CalendarLibs.createWeekDays(date);

  // Temporary Dates
  const now = useMemo(() => new Date(), []);
  const diaries = useMemo(
    () => [
      new Date(2024, 10, 10),
      new Date(2024, 10, 11),
      new Date(2024, 10, 13),
      new Date(2024, 10, 15),
    ],
    []
  );
  return (
    <div className="flex flex-col w-full max-w-[412px] px-5 whitespace-nowrap min-w-[280px]">
      <div className="flex items-center px-3 h-[37px]">
        <div className="w-full py-2 px-3 flex justify-between items-center">
          {weekDays.map((day) => {
            return (
              <div key={day} className="flex justify-center items-center">
                <span className="text-app-gray-1100 text-body3">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative w-full flex flex-col p-3 gap-y-2.5 rounded-xl">
        <div className="absolute bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 opacity-10 rounded-xl top-0 left-0 w-full h-full" />
        <div className="py-1 flex justify-between relative">
          {array.map((day) => {
            const type = CalendarLibs.getCalendarType(day, {
              now,
              diaries,
              selectedDate,
              stage: CalendarStageType.DEFAULT,
            });
            return (
              <AppCalendarDay.Default
                day={day.date}
                key={day.key}
                type={type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AppCalendarBodyDefault = () => {
  const { date, selectedDate } = useContext(AppCalendarContext);
  const weekDays = CalendarLibs.createWeekNames(date);
  const { matrix } = CalendarLibs.createMonthDays(date);

  // Temporary Dates
  const now = useMemo(() => new Date(), []);
  const diaries = useMemo(
    () => [
      new Date(2024, 10, 10),
      new Date(2024, 10, 11),
      new Date(2024, 10, 13),
      new Date(2024, 10, 15),
    ],
    []
  );

  return (
    <div className="flex flex-col w-full max-w-[412px] px-5 whitespace-nowrap min-w-[280px]">
      <div className="flex items-center px-3 h-[37px]">
        <div className="w-full py-2 px-3 flex justify-between items-center">
          {weekDays.map((day) => {
            return (
              <div key={day} className="flex justify-center items-center">
                <span className="text-app-gray-1100 text-body3">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative w-full flex flex-col p-3 gap-y-2.5 rounded-xl">
        <div className="absolute bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 opacity-10 rounded-xl top-0 left-0 w-full h-full" />
        {matrix.map(({ array: row, key }) => {
          return (
            <div className="py-1 flex justify-between relative" key={key}>
              {row.map((day) => {
                const type = CalendarLibs.getCalendarType(day, {
                  now,
                  diaries,
                  selectedDate,
                  stage: CalendarStageType.DEFAULT,
                });
                return (
                  <AppCalendarDay.Default
                    day={day.date}
                    key={day.key}
                    type={type}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AppCalendarBodyCreate = () => {
  const { date, selectedDate, onChange } = useContext(AppCalendarContext);
  const weekDays = CalendarLibs.createWeekNames(date);
  const { matrix } = CalendarLibs.createMonthDays(date);

  // Temporary Dates
  const now = useMemo(() => new Date(), []);
  return (
    <div className="flex flex-col w-full max-w-[412px] px-5 whitespace-nowrap min-w-[280px]">
      <div className="flex items-center px-3 h-[37px]">
        <div className="w-full py-2 px-3 flex justify-between items-center">
          {weekDays.map((day) => {
            return (
              <div key={day} className="flex justify-center items-center">
                <span className="text-app-gray-1100 text-body3">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative w-full flex flex-col p-3 gap-y-2.5 rounded-xl">
        <div className="absolute bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 opacity-10 rounded-xl top-0 left-0 w-full h-full" />
        {matrix.map(({ array: row, key }) => {
          return (
            <div className="py-1 flex justify-between relative" key={key}>
              {row.map((day) => {
                const type = CalendarLibs.getCalendarType(day, {
                  now,
                  selectedDate,
                  stage: CalendarStageType.DEFAULT,
                });
                return (
                  <AppCalendarDay.Create
                    day={day.date}
                    key={day.key}
                    type={type}
                    onClick={() => {
                      onChange?.(day.date);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export interface AppCalendarProps extends PropsWithChildren {
  className?: string;
  close?: boolean;

  date?: Date;
  selectedDate?: Date;
  onChange?: (date: Date) => unknown;
}

const AppCalendar = forwardRef<HTMLDivElement, AppCalendarProps>(
  function AppCalendarManual(props, ref) {
    const { selectedDate, onChange, close = false, children } = props;
    const [date, setDate] = useState(startOfDay(props.date ?? new Date()));
    const className = ClassNameLibs.merge(
      props,
      "w-full flex flex-col items-center"
    );

    const onNextClick = () => {
      setDate((date) => {
        return addMonths(date, 1);
      });
    };

    const onPrevClick = () => {
      setDate((date) => {
        return subMonths(date, 1);
      });
    };
    return (
      <AppCalendarContext.Provider
        value={{
          date,
          selectedDate,
          onNextClick,
          onPrevClick,
          onChange,
          close,
        }}
      >
        <div className={className} ref={ref}>
          {children}
        </div>
      </AppCalendarContext.Provider>
    );
  }
);

const AppCalendarBody = Object.assign(
  {},
  {
    Default: AppCalendarBodyDefault,
    Create: AppCalendarBodyCreate,
  }
);

export {
  AppCalendar,
  AppCalendarBody,
  AppCalendarHeader,
  AppCalendarShortBody,
};

export default AppCalendar;

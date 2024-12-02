import { ClassNameLibs } from "@/lib/utils";
import {
  addMonths,
  format,
  setMonth,
  startOfDay,
  startOfYear,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import {
  cloneElement,
  createContext,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import ArrowLeftSvg from "@/app/assets/icons/ArrowLeftSmall.svg";
import ArrowRightSvg from "@/app/assets/icons/ArrowRightSmall.svg";
import XMarkSvg from "@/app/assets/icons/XMark.svg";
import { CalendarLibs } from "@/app/lib/calendar";
import { MonthDay } from "@/app/lib/calendar/types";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export interface CalendarDayProps extends PropsWithChildren {
  date: MonthDay;
  className?: string;
}

export type CalendarDay = (props: CalendarDayProps) => ReactNode;

interface AppCalendarContextType {
  date: Date;
  onChange?: (date: Date) => unknown;
  onMonthClick?: (month: number) => unknown;
  onNextClick: () => unknown;
  onPrevClick: () => unknown;
}

const AppCalendarContext = createContext<AppCalendarContextType>(null!);

const AppCalendarNavBar = () => {
  const { date, onNextClick, onPrevClick } = useContext(AppCalendarContext);
  const text = format(date, "yyyy년 MM월", { locale: ko });

    return (
      <div className="flex justify-between p-1 h-[56px] w-full items-center">
        <div className="w-10 h-10" />
        <div className="p-3 gap-x-3 flex items-center">
          <button
            onClick={() => onPrevClick()}
            className="w-6 h-6 flex justify-center items-center text-app-gray-400"
          >
            <ArrowLeftSvg />
          </button>
          <AppCalendarSheet>
            <h3 className="text-sub3 text-app-gray-400">{text}</h3>
          </AppCalendarSheet>
          <button
            onClick={() => onNextClick()}
            className="w-6 h-6 flex justify-center items-center text-app-gray-400"
          >
            <ArrowRightSvg />
          </button>
        </div>
        <Link href={"/home"}>
          <button className="w-10 h-10 flex justify-center items-center text-app-gray-400">
            <XMarkSvg />
          </button>
        </Link>
      </div>
    );
};

export interface AppCalendarHeaderProps {
  classNames?: {
    text?: string;
    prevIcon?: string;
    nextIcon?: string;
  };
}

const AppCalendarHeader = (props: AppCalendarHeaderProps) => {
  const { date, onNextClick, onPrevClick } = useContext(AppCalendarContext);
  const text = format(date, "yyyy년 MM월", { locale: ko });
  const prevClassNames = cn(
    "w-6 h-6 flex justify-center items-center text-app-gray-400",
    props.classNames?.prevIcon
  );
  const nextClassNames = cn(
    "w-6 h-6 flex justify-center items-center text-app-gray-400",
    props.classNames?.nextIcon
  );
  const textClassNames = cn(
    "text-sub3 text-app-gray-400",
    props.classNames?.text
  );

  return (
    <div className="flex justify-center p-1 h-[56px]">
      <div className="p-3 gap-x-3 flex items-center">
        <button onClick={() => onPrevClick()} className={prevClassNames}>
          <ArrowLeftSvg />
        </button>
        <h3 className={textClassNames}>{text}</h3>
        <button onClick={() => onNextClick()} className={nextClassNames}>
          <ArrowRightSvg />
        </button>
      </div>
    </div>
  );
};

export interface AppCalendarWeekDayProps {
  className?: string;
}

const AppCalendarWeekDay = (props: AppCalendarWeekDayProps) => {
  const { date } = useContext(AppCalendarContext);
  const weekDays = CalendarLibs.createWeekNames(date);
  const className = ClassNameLibs.merge(
    props,
    "flex items-center px-5 h-[37px]"
  );

  return (
    <div className={className}>
      <div className="w-full py-2 px-6 flex justify-between items-center">
        {weekDays.map((day) => {
          return (
            <div key={day} className="flex justify-center items-center">
              <span className="text-white text-body3">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export interface AppCalendarBodyContainerProps extends PropsWithChildren {
  className?: string;
}

const AppCalendarBodyContainer = (props: AppCalendarBodyContainerProps) => {
  const { children } = props;
  const className = ClassNameLibs.merge(
    props,
    "flex flex-col w-full px-5 whitespace-nowrap min-w-[280px] transition-all"
  );

  return <div className={className}>{children}</div>;
};

export interface AppCalendarBodyProps {
  children: CalendarDay;
  className?: string;
}

const AppCalendarShortBody = (props: AppCalendarBodyProps) => {
  const today = useMemo(() => new Date(), []);
  const array = CalendarLibs.createWeekDays(today);
  const { children } = props;

  return (
    <div className="relative w-full flex flex-col gap-y-2.5 rounded-xl">
      <div className="absolute bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 opacity-10 rounded-xl top-0 left-0 w-full h-full" />
      <div className="py-1 flex justify-between relative backdrop-blur px-3 rounded-xl">
        {array.map((day) => {
          return cloneElement(children({ date: day }) as JSX.Element, {
            key: day.key,
          });
        })}
      </div>
    </div>
  );
};

const AppCalendarBody = (props: AppCalendarBodyProps) => {
  const { children } = props;
  const { date } = useContext(AppCalendarContext);
  const { matrix } = CalendarLibs.createMonthDays(date);

  return (
    <div className="relative w-full flex flex-col p-3 gap-y-2.5 rounded-xl">
      <div className="absolute bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 opacity-10 rounded-xl top-0 left-0 w-full h-full backdrop-blur" />
      {matrix.map(({ array: row, key }) => {
        return (
          <div className="py-1 flex justify-between relative" key={key}>
            {row.map((day) => {
              return cloneElement(children({ date: day }) as JSX.Element, {
                key: day.key,
              });
            })}
          </div>
        );
      })}
    </div>
  );
};

export interface AppCalendarProps extends PropsWithChildren {
  className?: string;
  close?: boolean;

  defaultDate?: Date;
  onChange?: (date: Date) => unknown;
}

const AppCalendarContainer = forwardRef<HTMLDivElement, AppCalendarProps>(
  function AppCalendarContainer(props, ref) {
    const { onChange, close = false, children } = props;
    const [date, setDate] = useState(
      startOfDay(props.defaultDate ?? new Date())
    );
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

    const onMonthClick = (month: number) => {
      setDate((date) => {
        return setMonth(date, month);
      });
    };
    return (
      <AppCalendarContext.Provider
        value={{
          date: date,
          onNextClick,
          onPrevClick,
          onChange,
          onMonthClick,
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

export interface AppCalendarSheetProps {
  className?: string;
  children?: ReactNode;
}

const AppCalendarSheet = (props: AppCalendarSheetProps) => {
  const { children } = props;
  const className = ClassNameLibs.merge(props, "w-full flex flex-col bg-black");
  const { date, onMonthClick } = useContext(AppCalendarContext);
  const from = startOfYear(date);
  const months = Array.from({ length: 12 }, (_n, num) => {
    const month = addMonths(from, 11 - num);
    return { text: format(month, "yyyy년 MM월"), month: 11 - num };
  });

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side="bottom" className="bg-black rounded-t-xl border-0">
        <SheetTitle className="hidden"></SheetTitle>
        <div className={className}>
          {months.map((month) => {
            return (
              <SheetClose
                key={month.text}
                onClick={() => {
                  onMonthClick?.(month.month);
                }}
              >
                <div className="w-full h-[56px] flex justify-center items-center">
                  <h4 className="text-white text-sub4">{month.text}</h4>
                </div>
              </SheetClose>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const AppCalendar = Object.assign(
  {
    Container: AppCalendarContainer,
    Header: AppCalendarHeader,
    WeekDay: AppCalendarWeekDay,
    BodyContainer: AppCalendarBodyContainer,
    ShortBody: AppCalendarShortBody,
    Body: AppCalendarBody,
  },
  {}
);

export default AppCalendar;

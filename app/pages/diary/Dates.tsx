import useDiaryDates from "@/app/hooks/useDiaryDates";
import { CalendarDayType, CalendarLibs } from "@/app/lib/calendar";
import { DiaryLibs } from "@/app/lib/diary";
import AppCalendar from "@/components/AppCalendar";
import AppCalendarDay from "@/components/AppCalendar/Day";
import { format } from "date-fns";

const DiaryDates = () => {
  const { array } = useDiaryDates();
  const dateGroup = DiaryLibs.groupDates(array ?? []);

  return (
    <div className="flex flex-col w-full gap-y-8">
      {dateGroup?.map((entries) => {
        const [key, dates] = entries;
        return (
          <AppCalendar.Container key={key} defaultDate={new Date(key)}>
            <AppCalendar.Header
              hasArrow={false}
              classNames={{ text: "!text-white !text-sub4" }}
            />
            <AppCalendar.WeekDay />
            <AppCalendar.BodyContainer>
              <AppCalendar.Body>
                {({ date }) => {
                  const diaryDate = dates[format(date.date, "yyyy-MM-dd")];
                  if (!diaryDate) {
                    return <AppCalendarDay.Default day={date.date} />;
                  }
                  const isEqual = CalendarLibs.isDateEqual(
                    date.date,
                    diaryDate.date
                  );
                  let type = CalendarDayType.SELECTED;
                  if (isEqual) {
                    type = CalendarDayType.ABLED;
                  }
                  const href = `/diary?date=${format(
                    diaryDate.date,
                    "yyyy-MM-dd"
                  )}`;
                  return (
                    <AppCalendarDay.Default
                      day={date.date}
                      type={type}
                      href={href}
                    />
                  );
                }}
              </AppCalendar.Body>
            </AppCalendar.BodyContainer>
          </AppCalendar.Container>
        );
      })}
    </div>
  );
};

export default DiaryDates;

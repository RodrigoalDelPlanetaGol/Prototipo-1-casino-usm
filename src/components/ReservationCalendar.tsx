import { CalendarDays } from "lucide-react";
import { getCurrentAndNextMonthCalendars } from "../utils/calendar";

type ReservationCalendarProps = {
  selectedDates: string[];
  onToggleDate: (date: string) => void;
  legend?: string;
};

export default function ReservationCalendar({
  selectedDates,
  onToggleDate,
  legend = "Selecciona fechas para reservar",
}: ReservationCalendarProps) {
  const [currentMonth, nextMonth] = getCurrentAndNextMonthCalendars();

  return (
    <div className="calendar">
      <div className="calendar__legend">
        <CalendarDays className="icon-btn" />
        {legend}
      </div>

      <div className="calendar-months">
        {[currentMonth, nextMonth].map((month) => (
          <article className="calendar-month" key={`${month.monthIndex}-${month.year}`}>
            <div className="calendar-month__title">{month.label}</div>

            <div className="calendar-month__weekdays">
              {["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"].map((day) => (
                <div key={day} className="calendar-month__weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="calendar-grid calendar-grid--month">
              {month.cells.map((cell, index) =>
                cell ? (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => !cell.disabled && onToggleDate(cell.key)}
                    className={`calendar-day ${
                      selectedDates.includes(cell.key) ? "calendar-day--active" : ""
                    } ${cell.disabled ? "calendar-day--disabled" : ""}`}
                    disabled={cell.disabled}
                  >
                    {cell.label}
                  </button>
                ) : (
                  <div key={`empty-${index}`} className="calendar-day calendar-day--empty" />
                )
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
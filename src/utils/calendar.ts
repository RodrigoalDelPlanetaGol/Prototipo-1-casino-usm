export type CalendarCell = {
  key: string;
  label: string;
  disabled: boolean;
};

export type MonthCalendar = {
  label: string;
  year: number;
  monthIndex: number;
  cells: Array<CalendarCell | null>;
};

const WEEKDAY_LABELS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"] as const;

function pad2(value: number) {
  return value.toString().padStart(2, "0");
}

export function formatDateKey(date: Date) {
  return `${pad2(date.getDate())}-${pad2(date.getMonth() + 1)}-${date.getFullYear()}`;
}

function parseDateKey(dateKey: string) {
  const [day, month, year] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function normalizeDate(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isWeekendDate(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isSelectableDate(date: Date, referenceDate = new Date()) {
  const target = normalizeDate(date);
  const today = normalizeDate(referenceDate);
  return target >= today && !isWeekendDate(target);
}

export function isSelectableDateKey(dateKey: string, referenceDate = new Date()) {
  return isSelectableDate(parseDateKey(dateKey), referenceDate);
}

export function getFirstSelectableDateKey(referenceDate = new Date()) {
  const d = normalizeDate(referenceDate);

  while (isWeekendDate(d)) {
    d.setDate(d.getDate() + 1);
  }

  return formatDateKey(d);
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getMondayBasedOffset(date: Date) {
  const jsDay = date.getDay(); // 0 = domingo
  return jsDay === 0 ? 6 : jsDay - 1;
}

function buildMonthCalendar(baseDate: Date, referenceDate = new Date()): MonthCalendar {
  const year = baseDate.getFullYear();
  const monthIndex = baseDate.getMonth();

  const firstOfMonth = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const offset = getMondayBasedOffset(firstOfMonth);

  const cells: Array<CalendarCell | null> = Array.from({ length: offset }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, monthIndex, day);
    cells.push({
      key: formatDateKey(date),
      label: pad2(day),
      disabled: !isSelectableDate(date, referenceDate),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const monthName = capitalize(
    new Intl.DateTimeFormat("es-CL", { month: "long" }).format(firstOfMonth)
  );

  return {
    label: `${monthName} ${year}`,
    year,
    monthIndex,
    cells,
  };
}

export function getCurrentAndNextMonthCalendars(referenceDate = new Date()): [
  MonthCalendar,
  MonthCalendar
] {
  const current = buildMonthCalendar(referenceDate, referenceDate);

  const nextDate = new Date(referenceDate);
  nextDate.setMonth(nextDate.getMonth() + 1);
  nextDate.setDate(1);

  const next = buildMonthCalendar(nextDate, referenceDate);

  return [current, next];
}
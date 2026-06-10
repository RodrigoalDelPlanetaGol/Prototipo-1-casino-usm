export type CalendarDay = {
  key: string;
  weekday: string;
  label: string;
};

function pad2(value: number) {
  return value.toString().padStart(2, "0");
}

function formatDateKey(date: Date) {
  return `${pad2(date.getDate())}-${pad2(date.getMonth() + 1)}-${date.getFullYear()}`;
}

export function getCurrentWeekDates(): CalendarDay[] {
  const today = new Date();
  const jsDay = today.getDay(); // 0 = domingo
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const weekdays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return {
      key: formatDateKey(date),
      weekday: weekdays[index],
      label: pad2(date.getDate()),
    };
  });
}

export function getCurrentWeekLabel(days: CalendarDay[]) {
  if (days.length === 0) return "";
  const first = days[0].key;
  const last = days[days.length - 1].key;
  return `${first.replace(/-/g, "/")} al ${last.replace(/-/g, "/")}`;
}
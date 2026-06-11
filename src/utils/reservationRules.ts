export function getPreviousBusinessDay(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);

  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() - 1);
  }

  return d;
}

function parseDateKey(dateKey: string) {
  const [day, month, year] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function canReserveSpecialMenu(
  menu: string,
  reservationDateKey: string,
  now = new Date()
) {
  if (menu === "Común") return true;

  const reservationDate = parseDateKey(reservationDateKey);
  const deadline = getPreviousBusinessDay(reservationDate);
  deadline.setHours(16, 0, 0, 0);

  return now.getTime() <= deadline.getTime();
}
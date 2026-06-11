export type Reservation = {
  id: number;
  code: string;
  registeredAt: string;
  dates: string[];
  menu: string;
  campus: string;
  status: string;
};
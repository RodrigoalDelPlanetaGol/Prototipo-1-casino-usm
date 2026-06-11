import type { Reservation } from "../types/casino";

type ReservationsTableProps = {
  reservations: Reservation[];
  onEdit: (reservation: Reservation) => void;
  onCancel: (id: number) => void;
};

function formatDates(dates?: string[]) {
  if (!Array.isArray(dates) || dates.length === 0) return "-";
  if (dates.length === 1) return dates[0];
  return dates.join(", ");
}

export default function ReservationsTable({
  reservations,
  onEdit,
  onCancel,
}: ReservationsTableProps) {
  return (
    <div className="subpanel" style={{ padding: 0 }}>
      <table className="table" style={{ fontSize: 14 }}>
        <thead>
          <tr>
            <th>Acción</th>
            <th>Fecha registro</th>
            <th>Código reserva</th>
            <th>Fechas reservadas</th>
            <th>Menú</th>
            <th>Campus/Sede reserva</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <button onClick={() => onEdit(reservation)} className="btn btn--primary">
                    Editar
                  </button>
                  <button onClick={() => onCancel(reservation.id)} className="btn">
                    Anular
                  </button>
                </div>
              </td>
              <td>{reservation.registeredAt}</td>
              <td>{reservation.code}</td>
              <td>{formatDates(reservation.dates)}</td>
              <td>{reservation.menu}</td>
              <td>{reservation.campus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
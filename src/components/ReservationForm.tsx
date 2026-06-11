import { CalendarDays, ChevronDown, ChevronRight, HelpCircle, Plus } from "lucide-react";
import { getCurrentWeekDates, getCurrentWeekLabel } from "../utils/calendar";
import { campuses, menuTypes } from "../data/casinoData";
import { canReserveSpecialMenu } from "../utils/reservationRules";

type ReservationFormProps = {
  selectedCampus: string;
  setSelectedCampus: React.Dispatch<React.SetStateAction<string>>;
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
  selectedDates: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
  showMinute: boolean;
  setShowMinute: React.Dispatch<React.SetStateAction<boolean>>;
  showHelp: boolean;
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
  onReserve: () => void;
};

export default function ReservationForm({
  selectedCampus,
  setSelectedCampus,
  selectedMenu,
  setSelectedMenu,
  selectedDates,
  setSelectedDates,
  showMinute,
  setShowMinute,
  showHelp,
  setShowHelp,
  onReserve,
}: ReservationFormProps) {
  const currentWeekDates = getCurrentWeekDates();
  const currentWeekLabel = getCurrentWeekLabel(currentWeekDates);

  const toggleDate = (date: string) => {
    setSelectedDates((current) =>
      current.includes(date) ? current.filter((d) => d !== date) : [...current, date]
    );
  };
  const hasBlockedSpecialMenu =
  selectedDates.length > 0 &&
  (selectedMenu === "Vegetariano" || selectedMenu === "Hipocalórico") &&
  !selectedDates.every((date) => canReserveSpecialMenu(selectedMenu, date));

  return (
    <div className="section">
      <div className="panel" style={{ padding: 14 }}>
        <div style={{ borderBottom: "1px solid #d8dee5", paddingBottom: 10, marginBottom: 14 }}>
          <h1 className="section__title">Reserva de menú</h1>
          <div className="section__subtitle">Sistema de casino de alimentación USM</div>
        </div>

        <div className="field-grid">
          <div className="field-grid field-grid--2">
            <label className="field">
              <span className="field__label">RUT comensal</span>
              <input value="22.564.891-5" readOnly className="field__input" />
            </label>

            <label className="field">
              <span className="field__label">Nombre</span>
              <input
                value="MANUEL CARDENAS TEZANOS IGNACIO"
                readOnly
                className="field__input"
                style={{ textTransform: "uppercase" }}
              />
            </label>

            <label className="field">
              <span className="field__label">Campus o sede</span>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="field__select"
              >
                {campuses.map((campus) => (
                  <option key={campus}>{campus}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">Menú</span>
              <select
                value={selectedMenu}
                onChange={(e) => setSelectedMenu(e.target.value)}
                className="field__select"
              >
                {menuTypes.map((menu) => (
                  <option key={menu}>{menu}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="field-grid field-grid--aside">
            <div>
              <div className="calendar">
                <div className="calendar__legend">
                  <CalendarDays className="icon-btn" />
                  Semana actual · {currentWeekLabel}
                </div>

                <div className="calendar-grid">
  {currentWeekDates.map((day) => (
    <div key={`${day.key}-head`} className="calendar-grid__head">
      {day.weekday}
    </div>
  ))}

  {currentWeekDates.map((day) => {
    const active = selectedDates.includes(day.key);

    return (
      <button
        key={day.key}
        onClick={() => toggleDate(day.key)}
        className={`calendar-day ${active ? "calendar-day--active" : ""}`}
      >
        {day.label}
      </button>
    );
  })}
</div>
              </div>
            </div>
          </div>

          <div className="actions">
  <div className="reserve-action-group">
    <button
      onClick={onReserve}
      className={`btn btn--primary ${hasBlockedSpecialMenu ? "btn--primary--blocked" : ""}`}
      disabled={hasBlockedSpecialMenu}
    >
      <Plus className="icon-btn" />
      Reservar
    </button>

    {hasBlockedSpecialMenu && (
      <div className="reserve-warning">
        Los menús vegetariano e hipocalórico solo se pueden reservar hasta las 16:00 del día hábil anterior.
      </div>
    )}
  </div>

  <button onClick={() => setShowMinute((v) => !v)} className="btn">
    {showMinute ? <ChevronDown className="icon-btn" /> : <ChevronRight className="icon-btn" />}
    {showMinute ? "Ocultar minuta" : "Mostrar minuta"}
  </button>

  <button onClick={() => setShowHelp((v) => !v)} className="btn">
    <HelpCircle className="icon-btn" />
    Ayuda
  </button>
</div>
        </div>
      </div>
    </div>
  );
}
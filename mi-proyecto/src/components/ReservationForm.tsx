import { CalendarDays, ChevronDown, ChevronRight, HelpCircle, Plus, Save } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { campuses, menuTypes, weekdays, type Reservation } from "../data/casinoData";
import { BLUE } from "../data/casinoData";
import type { Reservation as ReservationType } from "../types/casino";

type ReservationFormProps = {
  selectedCampus: keyof typeof campuses[number] | string;
  setSelectedCampus: Dispatch<SetStateAction<string>>;
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  selectedDates: string[];
  setSelectedDates: Dispatch<SetStateAction<string[]>>;
  showMinute: boolean;
  setShowMinute: Dispatch<SetStateAction<boolean>>;
  showHelp: boolean;
  setShowHelp: Dispatch<SetStateAction<boolean>>;
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
  const toggleDate = (date: string) => {
    setSelectedDates((current) =>
      current.includes(date) ? current.filter((d) => d !== date) : [...current, date]
    );
  };

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
              <input value="21.588.956-4" readOnly className="field__input" />
            </label>

            <label className="field">
              <span className="field__label">Nombre</span>
              <input
                value="RODRIGO ARIEL CACERES GAETE"
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
                  Semana de ejemplo
                </div>

                <div className="calendar-grid">
                  {weekdays.map((d) => (
                    <div key={d} className="calendar-grid__head">
                      {d}
                    </div>
                  ))}

                  {["25-05", "26-05", "27-05", "28-05", "29-05", "30-05", "31-05"].map((date) => {
                    const full = `${date.split("-")[0]}-${date.split("-")[1]}-2026`;
                    const active = selectedDates.includes(full);

                    return (
                      <button
                        key={full}
                        onClick={() => toggleDate(full)}
                        className={`calendar-day ${active ? "calendar-day--active" : ""}`}
                      >
                        {date.split("-")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <button onClick={onReserve} className="btn btn--primary">
              <Plus className="icon-btn" />
              Reservar
            </button>

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
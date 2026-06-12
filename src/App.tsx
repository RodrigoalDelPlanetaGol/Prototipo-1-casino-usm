import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Sparkles, X } from "lucide-react";

import { getFirstSelectableDateKey, isSelectableDateKey } from "./utils/calendar";
import ReservationCalendar from "./components/ReservationCalendar";
import { BLUE, initialReservations, minuteByCampus } from "./data/casinoData";
import type { Reservation } from "./types/casino";
import "./styles/casino.css";
import { canReserveSpecialMenu } from "./utils/reservationRules";

import TopStrip from "./components/TopStrip";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import MobileMenu from "./components/MobileMenu";
import ReservationForm from "./components/ReservationForm";
import MinutePreview from "./components/MinutePreview";
import StatsCards from "./components/StatsCards";
import ReservationsTable from "./components/ReservationsTable";
import FeedbackToast from "./components/FeedbackToast";

const sections = ["Reserva de menú", "Mis reservas", "Mis consumos"];

function sortDateKeys(dates: string[]) {
  return [...dates].sort((a, b) => {
    const [da, ma, ya] = a.split("-").map(Number);
    const [db, mb, yb] = b.split("-").map(Number);
    return new Date(ya, ma - 1, da).getTime() - new Date(yb, mb - 1, db).getTime();
  });
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Reserva de menú");
  const [selectedCampus, setSelectedCampus] = useState("San Joaquín");
  const [selectedMenu, setSelectedMenu] = useState("Hipocalórico");
  const [selectedDates, setSelectedDates] = useState<string[]>([getFirstSelectableDateKey()]);
  const [draftSelectedDates, setDraftSelectedDates] = useState<string[]>([]);
  const [showMinute, setShowMinute] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftMenu, setDraftMenu] = useState("Hipocalórico");
  const [draftCampus, setDraftCampus] = useState("San Joaquín");
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const minute = minuteByCampus[selectedCampus as keyof typeof minuteByCampus];
  const availableCounts = useMemo(() => ({ almuerzos: 6, cenas: 0 }), []);

  const showFeedback = (message: string) => {
    setFeedbackMessage(message);
    window.setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
  };

  const toggleDate = (date: string) => {
    setSelectedDates((current) =>
      current.includes(date) ? current.filter((d) => d !== date) : [...current, date]
    );
  };

  const toggleDraftDate = (date: string) => {
    setDraftSelectedDates((current) =>
      current.includes(date) ? current.filter((d) => d !== date) : [...current, date]
    );
  };

  const openEdit = (reservation: Reservation) => {
    setEditingId(reservation.id);
    setDraftMenu(reservation.menu);
    setDraftCampus(reservation.campus);
    setDraftSelectedDates(reservation.dates);
    setActiveSection("Mis reservas");
  };

  const saveEdit = () => {
    if (editingId == null) return;

    if (draftSelectedDates.length === 0) {
      showFeedback("Debes seleccionar al menos una fecha para guardar la edición.");
      return;
    }

    const invalidDates = draftSelectedDates.filter((date) => !isSelectableDateKey(date));
    if (invalidDates.length > 0) {
      showFeedback("No puedes guardar fechas pasadas ni fines de semana.");
      return;
    }

    const blocked = draftSelectedDates.some(
      (date) =>
        (draftMenu === "Vegetariano" || draftMenu === "Hipocalórico") &&
        !canReserveSpecialMenu(draftMenu, date)
    );

    if (blocked) {
      showFeedback(
        "Los menús vegetariano e hipocalórico solo se pueden reservar hasta las 16:00 del día hábil anterior."
      );
      return;
    }

    const sortedDates = sortDateKeys(draftSelectedDates);

    setReservations((current) =>
      current.map((r) =>
        r.id === editingId
          ? {
              ...r,
              menu: draftMenu,
              campus: draftCampus,
              dates: sortedDates,
              registeredAt: "Modificada ahora",
            }
          : r
      )
    );

    setEditingId(null);
    showFeedback("Su reserva se ha editado correctamente");
  };

  const handleReserve = () => {
    if (selectedDates.length === 0) {
      showFeedback("Por favor, seleccione al menos un día en el calendario.");
      return;
    }

    const invalidDates = selectedDates.filter((date) => !isSelectableDateKey(date));
    if (invalidDates.length > 0) {
      showFeedback("No puedes reservar fechas pasadas ni fines de semana.");
      return;
    }

    const blocked = selectedDates.some(
      (date) =>
        (selectedMenu === "Vegetariano" || selectedMenu === "Hipocalórico") &&
        !canReserveSpecialMenu(selectedMenu, date)
    );

    if (blocked) {
      showFeedback(
        "Los menús vegetariano e hipocalórico solo se pueden reservar hasta las 16:00 del día hábil anterior."
      );
      return;
    }

    const sortedDates = sortDateKeys(selectedDates);

    const newReservation: Reservation = {
      id: Date.now(),
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      registeredAt: "Ahora",
      dates: sortedDates,
      menu: selectedMenu,
      campus: selectedCampus,
      status: "Activa",
    };

    setReservations((current) => [...current, newReservation]);
    setSelectedDates([]);
    showFeedback("Reserva guardada correctamente");
    setActiveSection("Mis reservas");
  };

  const cancelReservation = (id: number) => {
    setReservations((current) => current.filter((r) => r.id !== id));
  };

  const selectSection = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <TopStrip />

      <Header onMenuToggle={() => setMenuOpen((v) => !v)} showMenuButton={isMobile} />

      <main className="container main-shell">
        <div className="main-grid">
          {!isMobile && <TabBar activeSection={activeSection} onSelectSection={setActiveSection} />}

          {isMobile && (
            <MobileMenu open={menuOpen} activeSection={activeSection} onSelectSection={selectSection} />
          )}

          <section className="content">
            {activeSection === "Reserva de menú" && (
              <div className="section">
                <div className="reservation-layout">
                  <div className="reservation-layout__main">
                    <ReservationForm
                      selectedCampus={selectedCampus}
                      setSelectedCampus={setSelectedCampus}
                      selectedMenu={selectedMenu}
                      setSelectedMenu={setSelectedMenu}
                      selectedDates={selectedDates}
                      setSelectedDates={setSelectedDates}
                      showMinute={showMinute}
                      setShowMinute={setShowMinute}
                      showHelp={showHelp}
                      setShowHelp={setShowHelp}
                      onReserve={handleReserve}
                    />

                    <div className="reservation-stats-block">
                      <StatsCards almuerzos={availableCounts.almuerzos} cenas={availableCounts.cenas} />
                    </div>

                    {showHelp && (
                      <div className="subpanel helpbox">
                        <div className="info-card__title">Ayuda</div>
                        <p className="muted">
                          Ante cualquier problema con la interfaz, por favor contacte al grupo para una
                          evaluación de la misma.
                        </p>
                      </div>
                    )}
                  </div>

                  {!isMobile && showMinute && (
                    <div className="reservation-layout__minute">
                      <MinutePreview
                        selectedCampus={selectedCampus as keyof typeof minuteByCampus}
                        selectedMenu={selectedMenu}
                        showMinute={showMinute}
                      />
                    </div>
                  )}
                  {isMobile && showMinute && (
      <div className="reservation-mobile-minute">
        <MinutePreview
          selectedCampus={selectedCampus as keyof typeof minuteByCampus}
          selectedMenu={selectedMenu}
          showMinute={showMinute}
        />
      </div>
    )}
                </div>
              </div>
            )}

            {activeSection === "Mis reservas" && (
              <div className="section">
                <div style={{ borderBottom: "1px solid #d8dee5", paddingBottom: 10, marginBottom: 14 }}>
                  <h1 className="section__title">Mis reservas</h1>
                  <div className="section__subtitle">
                    Edición directa para evitar anular y crear de nuevo.
                  </div>
                </div>

                <div className="field-grid field-grid--aside">
                  <div className="field-grid">
                    <StatsCards almuerzos={availableCounts.almuerzos} cenas={availableCounts.cenas} />

                    {editingId != null && (
                      <div className="subpanel" style={{ background: "#f7fbfd" }}>
                        <div
                          className="info-card__title"
                          style={{ color: BLUE, display: "flex", alignItems: "center", gap: 8 }}
                        >
                          <Sparkles className="icon-btn" />
                          Edición directa de reserva
                        </div>

                        <div className="field-grid field-grid--2">
                          <label className="field">
                            <span className="field__label">Campus o sede</span>
                            <select
                              value={draftCampus}
                              onChange={(e) => setDraftCampus(e.target.value)}
                              className="field__select"
                            >
                              {["San Joaquín", "Casa Central Valparaíso", "Viña del Mar", "Concepción"].map(
                                (campus) => (
                                  <option key={campus}>{campus}</option>
                                )
                              )}
                            </select>
                          </label>

                          <label className="field">
                            <span className="field__label">Menú</span>
                            <select
                              value={draftMenu}
                              onChange={(e) => setDraftMenu(e.target.value)}
                              className="field__select"
                            >
                              {["Común", "Hipocalórico", "Vegetariano"].map((menu) => (
                                <option key={menu}>{menu}</option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <div style={{ marginTop: 12 }}>
                          <ReservationCalendar
                            selectedDates={draftSelectedDates}
                            onToggleDate={toggleDraftDate}
                            legend="Editar fechas de reserva"
                          />
                        </div>

                        <div className="actions" style={{ marginTop: 12 }}>
                          <button onClick={saveEdit} className="btn btn--primary" type="button">
                            <CheckCircle2 className="icon-btn" />
                            Guardar cambios
                          </button>
                          <button onClick={() => setEditingId(null)} className="btn" type="button">
                            <X className="icon-btn" />
                            Cancelar edición
                          </button>
                        </div>
                      </div>
                    )}

                    <ReservationsTable reservations={reservations} onEdit={openEdit} onCancel={cancelReservation} />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "Mis consumos" && (
              <div className="section">
                <div style={{ borderBottom: "1px solid #d8dee5", paddingBottom: 10, marginBottom: 14 }}>
                  <h1 className="section__title">Mis consumos</h1>
                  <div className="section__subtitle">Resumen histórico de uso del beneficio.</div>
                </div>

                <div className="field-grid field-grid--aside">
                  <StatsCards almuerzos={availableCounts.almuerzos} cenas={availableCounts.cenas} />

                  <div className="info-card">
                    <div className="info-card__title">Vista general</div>
                    <p>Este bloque puede seguir como placeholder hasta integrar datos reales del backend.</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <FeedbackToast message={feedbackMessage} />

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__pill">Sitio web hecho con cariño por el grupo 6</span>
        </div>
      </footer>
    </div>
  );
}
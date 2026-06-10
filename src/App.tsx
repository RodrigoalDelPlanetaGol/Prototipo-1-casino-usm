import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Sparkles, X } from "lucide-react";

import { getCurrentWeekDates } from "./utils/calendar";
import { BLUE, initialReservations, minuteByCampus } from "./data/casinoData";
import type { Reservation } from "./types/casino";
import "./styles/casino.css";

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

export default function App() {
  const [activeSection, setActiveSection] = useState("Reserva de menú");
  const [selectedCampus, setSelectedCampus] = useState("San Joaquín");
  const [selectedMenu, setSelectedMenu] = useState("Hipocalórico");
  const [selectedDates, setSelectedDates] = useState<string[]>([
    getCurrentWeekDates()[0]?.key ?? "",
  ]);
  const [isMobile, setIsMobile] = useState(false);
  const [showMinute, setShowMinute] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftMenu, setDraftMenu] = useState("Hipocalórico");
  const [draftCampus, setDraftCampus] = useState("San Joaquín");
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

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

  const openEdit = (reservation: Reservation) => {
    setEditingId(reservation.id);
    setDraftMenu(reservation.menu);
    setDraftCampus(reservation.campus);
    setActiveSection("Mis reservas");
  };

  const saveEdit = () => {
    if (editingId == null) return;

    setReservations((current) =>
      current.map((r) =>
        r.id === editingId
          ? {
              ...r,
              menu: draftMenu,
              campus: draftCampus,
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

    const sortedDates = [...selectedDates].sort();
    const fromDate = sortedDates[0];
    const toDate = sortedDates[sortedDates.length - 1];

    const newReservation: Reservation = {
      id: Date.now(),
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      registeredAt: "Ahora",
      from: fromDate,
      to: toDate,
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

      <Header onMenuToggle={() => setMenuOpen((v) => !v)} />

      <main className="container main-shell">
        <div className="main-grid">
          {!isMobile && (
            <TabBar activeSection={activeSection} onSelectSection={setActiveSection} />
          )}

          {isMobile && (
            <MobileMenu
              open={menuOpen}
              activeSection={activeSection}
              onSelectSection={selectSection}
            />
          )}

          <section className="content">
            {activeSection === "Reserva de menú" && (
              <div className="section">
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
                  toggleDate={toggleDate}
                />

                <div className="helpbox">
                  <StatsCards
                    almuerzos={availableCounts.almuerzos}
                    cenas={availableCounts.cenas}
                  />
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

                <MinutePreview
                  selectedCampus={selectedCampus as keyof typeof minuteByCampus}
                  selectedMenu={selectedMenu}
                  showMinute={showMinute}
                  minute={minute}
                />
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
                    <StatsCards
                      almuerzos={availableCounts.almuerzos}
                      cenas={availableCounts.cenas}
                    />

                    {editingId != null && (
                      <div className="subpanel" style={{ background: "#f7fbfd" }}>
                        <div
                          className="info-card__title"
                          style={{
                            color: BLUE,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
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

                        <div className="actions">
                          <button onClick={saveEdit} className="btn btn--primary">
                            <CheckCircle2 className="icon-btn" />
                            Guardar cambios
                          </button>
                          <button onClick={() => setEditingId(null)} className="btn">
                            <X className="icon-btn" />
                            Cancelar edición
                          </button>
                        </div>
                      </div>
                    )}

                    <ReservationsTable
                      reservations={reservations}
                      onEdit={openEdit}
                      onCancel={cancelReservation}
                    />
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
                  <StatsCards
                    almuerzos={availableCounts.almuerzos}
                    cenas={availableCounts.cenas}
                  />

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
      <footer className="footer">Sitio web hecho con cariño por el grupo 6</footer>
    </div>
  );
}
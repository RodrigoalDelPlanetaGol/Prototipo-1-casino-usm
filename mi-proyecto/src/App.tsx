import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronDown, ChevronRight, HelpCircle, Menu, Plus, Save, Sparkles, X } from "lucide-react";
import TopStrip from "./components/TopStrip";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import MobileMenu from "./components/MobileMenu";
import ReservationForm from "./components/ReservationForm";
import MinutePreview from "./components/MinutePreview";
import StatsCards from "./components/StatsCards";
import ReservationsTable from "./components/ReservationsTable";
import FeedbackToast from "./components/FeedbackToast";
const BLUE = "#015D8F";
const campuses = ["San Joaquín", "Casa Central Valparaíso", "Viña del Mar", "Concepción"];
const menuTypes = ["Común", "Hipocalórico", "Vegetariano"];
const weekdays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const sections = ["Reserva de menú", "Mis reservas", "Mis consumos"];

const minuteByCampus = {
  "San Joaquín": {
    title: "Minuta Casino Campus San Joaquín",
    subtitle: "Semana actual",
    days: [
      { day: "Lunes", entry: "Ensaladas surtidas", main: "Chapsui de ave con arroz", veg: "Chapsui de verduras con arroz", hypo: "Bowl de ensaladas surtidas con atún", dessert: "Yogurt / fruta / jalea", allergens: "Huevo, lácteo, soya" },
      { day: "Martes", entry: "Ensaladas surtidas", main: "Porotos mazamorra con longaniza", veg: "Porotos mazamorra con hamburguesa de soya", hypo: "Ensaladas surtidas con tomate relleno", dessert: "Jalea / fruta / flan", allergens: "Huevo, sulfitos, lácteos, soya" },
      { day: "Miércoles", entry: "Ensaladas surtidas", main: "Trutro entero asado con fideos mostaccioli", veg: "Verduras salteadas con fideos mostaccioli", hypo: "Ensaladas surtidas con palta reina", dessert: "Jalea / fruta / semola con leche", allergens: "Huevo, lácteo, soya, gluten" },
      { day: "Jueves", entry: "Ensaladas surtidas", main: "Merluza apanada con puré florentino", veg: "Pastel de papas carne de soya", hypo: "Ensaladas surtidas con huevo y carne", dessert: "Jalea / fruta / brownie", allergens: "Lácteo, soya, huevo, leche" },
      { day: "Viernes", entry: "Ensaladas surtidas", main: "Carbonada de vacuno", veg: "Carbonada de verduras con carne de soya", hypo: "Ensaladas griegas surtidas", dessert: "Fruta / helado / jalea", allergens: "Gluten, lácteo, soya" },
    ],
  },
  "Viña del Mar": {
    title: "Minuta Sede Viña del Mar",
    subtitle: "Semana actual",
    days: [
      { day: "Lunes", entry: "Ensaladas surtidas", main: "Pollo al horno con arroz", veg: "Quiche de verduras", hypo: "Ensalada completa", dessert: "Fruta", allergens: "Gluten, huevo" },
      { day: "Martes", entry: "Crema", main: "Pescado al vapor con puré", veg: "Guiso vegetal", hypo: "Plato liviano", dessert: "Jalea", allergens: "Pescado, lácteo" },
      { day: "Miércoles", entry: "Ensaladas surtidas", main: "Vacuno salteado", veg: "Lasaña vegetal", hypo: "Bowl proteico", dessert: "Flan", allergens: "Lácteo, gluten" },
      { day: "Jueves", entry: "Sopa", main: "Cerdo a la mostaza", veg: "Hamburguesa vegetal", hypo: "Ensalada griega", dessert: "Fruta", allergens: "Soya, mostaza" },
      { day: "Viernes", entry: "Ensaladas surtidas", main: "Pavo al romero", veg: "Charquicán de cochayuyo", hypo: "Bowl saludable", dessert: "Jalea", allergens: "Gluten, huevo" },
    ],
  },
  "Casa Central Valparaíso": {
    title: "Minuta Casa Central Valparaíso",
    subtitle: "Semana actual",
    days: [
      { day: "Lunes", entry: "Sopa / ensalada", main: "Escalopa Kayser", veg: "Quiche cebolla", hypo: "Bowl liviano", dessert: "Jalea", allergens: "Gluten, huevo" },
      { day: "Martes", entry: "Ensaladas surtidas", main: "Cerdo mongoliano", veg: "Curry de garbanzos", hypo: "Bowl integral", dessert: "Fruta", allergens: "Lácteos, gluten" },
      { day: "Miércoles", entry: "Sopa de pollo", main: "Ragout de pollo", veg: "Charquicán de cochayuyo", hypo: "Ensaladas 4", dessert: "Postres variados", allergens: "Soya, gluten" },
      { day: "Jueves", entry: "Crema", main: "Longaniza", veg: "Hamburguesa plant based", hypo: "Bowl de vegetales", dessert: "Jaleas", allergens: "Mariscos, soya" },
      { day: "Viernes", entry: "Sopa carne / verduras", main: "Burrito con pino", veg: "Fajita vegetariana", hypo: "Ensalada griega", dessert: "Fruta", allergens: "Gluten, lácteos" },
    ],
  },
  Concepción: {
    title: "Minuta Concepción",
    subtitle: "Semana actual",
    days: [
      { day: "Lunes", entry: "Crema", main: "Pasta con salsa", veg: "Verduras salteadas", hypo: "Ensalada completa", dessert: "Jalea", allergens: "Huevo" },
      { day: "Martes", entry: "Ensalada", main: "Carne al jugo", veg: "Hamburguesa vegetal", hypo: "Bowl integral", dessert: "Fruta", allergens: "Gluten, pescado" },
      { day: "Miércoles", entry: "Sopa", main: "Lasaña", veg: "Lasaña vegetal", hypo: "Plato liviano", dessert: "Flan", allergens: "Lácteos" },
      { day: "Jueves", entry: "Ensaladas surtidas", main: "Porotos", veg: "Garbanzos", hypo: "Bowl proteico", dessert: "Brownie", allergens: "Soya, gluten" },
      { day: "Viernes", entry: "Crema", main: "Charquicán", veg: "Pastel de verduras", hypo: "Ensalada griega", dessert: "Fruta", allergens: "Lácteos" },
    ],
  },
} as const;



const initialReservations: Reservation[] = [
  {
    id: 1,
    code: "112721",
    registeredAt: "26-05-2026 01:00",
    from: "26-06-2026",
    to: "26-06-2026",
    menu: "Hipocalórico",
    campus: "San Joaquín",
    status: "Activa",
  },
];

function UsmLogo() {
  return (
    <img
      src="https://casino.usm.cl/solicitud/img/logo-usm.svg"
      alt="Universidad Técnica Federico Santa María"
      className="usm-logo"
    />
  );
}
export type Reservation = {
  id: number;
  code: string;
  registeredAt: string;
  from: string;
  to: string;
  menu: string;
  campus: string;
  status: string;
};
export default function App() {
  const [activeSection, setActiveSection] = useState("Reserva de menú");
  const [selectedCampus, setSelectedCampus] = useState<keyof typeof minuteByCampus>("San Joaquín");
  const [selectedMenu, setSelectedMenu] = useState("Hipocalórico");
  const [selectedDates, setSelectedDates] = useState<string[]>(["27-05-2026"]);
  const [showMinute, setShowMinute] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftMenu, setDraftMenu] = useState("Hipocalórico");
  const [draftCampus, setDraftCampus] = useState("San Joaquín");
  const [menuOpen, setMenuOpen] = useState(false);
  //agregado 1
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const minute = minuteByCampus[selectedCampus];
  const availableCounts = useMemo(() => ({ almuerzos: 6, cenas: 0 }), []);

  const toggleDate = (date: string) => {
    setSelectedDates((current) => (current.includes(date) ? current.filter((d) => d !== date) : [...current, date]));
  };

  const openEdit = (reservation: Reservation) => {
    setEditingId(reservation.id);
    setDraftMenu(reservation.menu);
    setDraftCampus(reservation.campus);
    setActiveSection("Mis reservas");
  };

  const saveEdit = () => {
    if (editingId == null) return;
    setReservations((current) => current.map((r) => (r.id === editingId ? { ...r, menu: draftMenu, campus: draftCampus, registeredAt: "Modificada ahora" } : r)));
    setEditingId(null);

    //agregado 2
    setFeedbackMessage("Su reserva se ha editado correctamente");
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
  };

  // agregado 3
  const handleReserve = () => {
    if (selectedDates.length === 0) {
      setFeedbackMessage("Por favor, seleccione al menos un día en el calendario.");
      setTimeout(() => setFeedbackMessage(null), 3000);
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
    setFeedbackMessage("Reserva guardada correctamente");
    setTimeout(() => setFeedbackMessage(null), 3000);
    setActiveSection("Mis reservas");
  };



  const cancelReservation = (id: number) => setReservations((current) => current.filter((r) => r.id !== id));

  const selectSection = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html, body, #root { height: 100%; }
        body { margin: 0; font-family: 'Montserrat', Arial, Helvetica, sans-serif; background: #edf0f2; color: #1f2937; }
        button, input, select { font: inherit; }
        .app-shell { min-height: 100vh; background: #edf0f2; }
        .container { max-width: 67%; margin: 0 auto; padding: 0 14px; }
        .top-strip { background: ${BLUE}; color: #fff; }
        .top-strip__inner { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; font-size: 12px; font-weight: 700; }
        .top-strip__right { display: flex; align-items: center; gap: 16px; }
        .header { background: #fff; border-bottom: 1px solid #d8d8d8; }
        .header__inner { display: flex; justify-content: space-between; align-items: center; padding: 14px 0 18px; }
        .brand { display: flex; align-items: center; gap: 12px; }
        .usm-logo { width: min(325px, 44vw); max-width: 100%; height: auto; max-height: 72px; display: block; }
        .menu-btn { background: ${BLUE}; color: #fff; border: 0; width: 48px; height: 48px; border-radius: 3px; display: grid; place-items: center; cursor: pointer; }
        .main-shell { background: #fff; border: 1px solid #d8d8d8; border-top: 0; margin: 0 auto; }
        .main-grid { padding: 0 0 14px; }
        .tabs { display: flex; gap: 0; border-bottom: 1px solid #d8d8d8; padding-left: 0; overflow-x: auto; margin: 0 0 0 0; }
        .tab { border: 1px solid #d8d8d8; border-bottom: 0; background: #f8fafc; color: ${BLUE}; padding: 9px 16px; font-size: 14px; cursor: pointer; white-space: nowrap; border-top-left-radius: 3px; border-top-right-radius: 3px; font-family: 'Montserrat', Arial, Helvetica, sans-serif; }
        .tab--active { background: #fff; color: #334155; position: relative; top: 1px; }
        .content { background: #fff; min-height: 70vh; }
        .section { padding: 18px 22px 18px; }
        .section__title { font-size: 17px; margin: 0; color: #334155; font-weight: 700; }
        .section__subtitle { font-size: 13px; color: #6b7280; margin-top: 4px; }
        .panel { border: 1px solid #d8dee5; border-radius: 2px; background: #fff; }
        .panel--soft { background: #f7fbfd; }
        .field-grid { display: grid; gap: 14px; }
        .field-grid--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .field-grid--aside { grid-template-columns: 1fr 270px; }
        .field { display: flex; flex-direction: column; gap: 6px; font-size: 14px; color: #374151; }
        .field__label { font-weight: 600; color: #374151; }
        .field__input, .field__select { width: 100%; border: 1px solid #cfd8df; background: #fff; color: #374151; padding: 9px 12px; border-radius: 2px; font-family: 'Montserrat', Arial, Helvetica, sans-serif; }
        .field__input[readonly] { background: #eceff3; color: #4b5563; }
        .calendar { border: 1px solid #cfd8df; border-radius: 2px; background: #fff; padding: 14px; }
        .calendar__legend { display: flex; align-items: center; gap: 8px; color: #475569; font-size: 14px; margin-bottom: 10px; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; }
        .calendar-grid__head { font-weight: 600; color: #6b7280; font-size: 12px; }
        .calendar-day { border: 1px solid #cfd8df; background: #fff; color: #334155; border-radius: 2px; padding: 8px 0; font-size: 14px; cursor: pointer; }
        .calendar-day--active { background: ${BLUE}; color: #fff; border-color: ${BLUE}; }
        .actions { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 12px; border-top: 1px solid #e5e7eb; }
        .btn { border-radius: 2px; border: 1px solid #cfd8df; background: #fff; color: #334155; padding: 9px 14px; font-size: 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-family: 'Montserrat', Arial, Helvetica, sans-serif; }
        .btn--primary { background: ${BLUE}; border-color: ${BLUE}; color: #fff; }
        .info-card { padding: 14px; border: 1px solid #d8dee5; border-radius: 2px; background: #f7fbfd; font-size: 14px; color: #334155; }
        .info-card__title { font-weight: 700; margin-bottom: 8px; }
        .stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .stat { border: 1px solid #d8dee5; border-radius: 2px; background: #f7fbfd; padding: 14px; text-align: center; }
        .stat__label { font-size: 14px; color: #6b7280; }
        .stat__value { margin-top: 4px; font-size: 38px; line-height: 1; color: ${BLUE}; font-weight: 700; }
        .subpanel { border: 1px solid #d8dee5; border-radius: 2px; background: #fff; padding: 14px; }
        .subpanel__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .badge { background: #e6f2f7; color: ${BLUE}; padding: 4px 8px; border-radius: 2px; font-weight: 700; font-size: 12px; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { border: 1px solid #cfd8df; padding: 10px 12px; vertical-align: top; }
        .table thead th { background: #f1f5f9; color: #334155; font-weight: 700; }
        .table--blue thead th { background: ${BLUE}; color: #fff; }
        .table tbody tr:nth-child(even) { background: #f8fafc; }
        .table tbody tr:nth-child(odd) { background: #fff; }
        .mini { font-size: 12px; color: #6b7280; }
        .footer { margin-top: 12px; background: #111827; color: #fff; padding: 12px 16px; font-size: 14px; }
        .icon-btn { width: 18px; height: 18px; }
        .muted { color: #6b7280; }
        .helpbox { margin-top: 12px; }
        .mobile-menu { display: none; margin: 8px 0 0; }
        .mobile-menu--open { display: block; }
        .mobile-menu .sidebar__item { width: 100%; background: ${BLUE}; color: #fff; border: 0; border-bottom: 1px solid rgba(0,0,0,.12); text-align: left; padding: 14px 16px; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-family: 'Montserrat', Arial, Helvetica, sans-serif; }
        .mobile-menu .sidebar__item--active { background: #0f5f87; }
        .mobile-top-menu { display: none; }

        .toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #10b981; /* Verde de éxito */
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          font-weight: 500;
          font-size: 14px;
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 1100px) {
          .field-grid--aside { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .usm-logo { width: min(250px, 70vw); max-height: 58px; }
          .field-grid--2 { grid-template-columns: 1fr; }
          .stats { grid-template-columns: 1fr; }
          .header__inner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .section { padding: 12px; }
          .desktop-top-actions { display: none; }
          .mobile-top-menu { display: block; width: 100%; }
        }
        /* Ocultar la barra de desplazamiento pero mantener la funcionalidad */
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none; /* Para Internet Explorer y Edge */
          scrollbar-width: none; /* Para Firefox */
        }
      `}</style>

      <div className="top-strip">
        <div className="container top-strip__inner">
          <div>USM.cl</div>
          <div className="top-strip__right desktop-top-actions">
            <button className="btn" style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}>Minuta ▾</button>
            <span>Rodrigo Caceres</span>
            <button className="btn" style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}>Cerrar sesión</button>
          </div>
          <button className="menu-btn mobile-top-menu" aria-label="Menú" onClick={() => setMenuOpen((v) => !v)}>
            <Menu className="icon-btn" />
          </button>
        </div>
      </div>

      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <UsmLogo />
          </div>

          {/* Navegación real integrada en el header */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }} className="desktop-top-actions">
            <div className="tabs" role="tablist" aria-label="Navegación del casino" style={{ borderBottom: "none", marginBottom: 0 }}>
              {sections.map((section) => (
                <button
                  key={section}
                  role="tab"
                  aria-selected={activeSection === section}
                  onClick={() => setActiveSection(section)}
                  className={`tab ${activeSection === section ? "tab--active" : ""}`}
                  style={{ padding: "8px 12px" }}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Botón de Ayuda flotante adaptado al header */}
            <div style={{ position: "relative" }}>
              <button 
                onClick={() => setShowHelp((v) => !v)} 
                className="btn" 
                style={{ padding: "6px 12px", fontSize: "13px", background: "#f8fafc" }}
              >
                <HelpCircle className="icon-btn" style={{ width: 16, height: 16 }} />
                Ayuda
              </button>

              {showHelp && (
                <div className="subpanel" style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  width: "300px",
                  zIndex: 150,
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                  marginTop: "12px"
                }}>
                  <div className="info-card__title" style={{ marginBottom: "8px" }}>Ayuda</div>
                  <p className="muted" style={{ fontSize: "13px", lineHeight: "1.4" }}>
                    Ante cualquier problema con la interfaz, por favor contacte al grupo para una evaluación de la misma.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container main-shell">
        <div className="main-grid">
          
          <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => selectSection(section)}
                className={`sidebar__item ${activeSection === section ? "sidebar__item--active" : ""}`}
              >
                <span>{section}</span>
              </button>
            ))}
          </div>

          <section className="content">
            {activeSection === "Reserva de menú" && (
              <div className="section">
                <div className="panel" style={{ padding: 14 }}>
                  <div className="field-grid">
                    <div className="field-grid field-grid--2">
                      <label className="field">
                        <span className="field__label">RUT comensal</span>
                        <input value="21.588.956-4" readOnly className="field__input" />
                      </label>
                      <label className="field">
                        <span className="field__label">Nombre</span>
                        <input value="RODRIGO ARIEL CACERES GAETE" readOnly className="field__input" style={{ textTransform: "uppercase" }} />
                      </label>
                      <label className="field">
                        <span className="field__label">Campus o sede</span>
                        <select value={selectedCampus} onChange={(e) => setSelectedCampus(e.target.value as keyof typeof minuteByCampus)} className="field__select">
                          {campuses.map((campus) => <option key={campus}>{campus}</option>)}
                        </select>
                      </label>
                      <label className="field">
                        <span className="field__label">Menú</span>
                        <select value={selectedMenu} onChange={(e) => setSelectedMenu(e.target.value)} className="field__select">
                          {menuTypes.map((menu) => <option key={menu}>{menu}</option>)}
                        </select>
                      </label>
                    </div>

                    <div className="field-grid field-grid">
                      <div>
                        <div className="calendar">
                          <div className="calendar__legend">
                            <CalendarDays className="icon-btn" />
                            Semana de ejemplo
                          </div>
                          <div className="calendar-grid">
                            {weekdays.map((d) => <div key={d} className="calendar-grid__head">{d}</div>)}
                            {["25-05", "26-05", "27-05", "28-05", "29-05", "30-05", "31-05"].map((date) => {
                              const full = `${date.split("-")[0]}-${date.split("-")[1]}-2026`;
                              const active = selectedDates.includes(full);
                              return (
                                <button key={full} onClick={() => toggleDate(full)} className={`calendar-day ${active ? "calendar-day--active" : ""}`}>
                                  {date.split("-")[0]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="actions">
                      <button onClick={handleReserve} className="btn btn--primary"><Plus className="icon-btn" />Reservar</button>
                      <button onClick={() => setShowMinute((v) => !v)} className="btn">
                        {showMinute ? <ChevronDown className="icon-btn" /> : <ChevronRight className="icon-btn" />}
                        {showMinute ? "Ocultar minuta" : "Mostrar minuta"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="helpbox">
                  <div className="stats">
                    <div className="stat">
                      <div className="stat__label">Almuerzos</div>
                      <div className="stat__value">{availableCounts.almuerzos}</div>
                    </div>
                    <div className="stat">
                      <div className="stat__label">Cenas</div>
                      <div className="stat__value">{availableCounts.cenas}</div>
                    </div>
                  </div>

                  

                  {showMinute && (
                    <div className="subpanel helpbox">
                      <div style={{ textAlign: "center", marginBottom: 14 }}>
                        <h2 className="section__title" style={{ fontSize: 24, margin: 0 }}>Minuta</h2>
                        <div className="section__title">{minute.subtitle} · {selectedCampus}</div>
                      </div>
                     <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
  
  {/* TABLA PRINCIPAL (A la izquierda) */}
  <div style={{ flex: "1 1 500px", overflowX: "auto" }}>
    <table className="table table--blue" style={{ width: "100%", minWidth: 500 }}>
      <thead>
        <tr>
          <th>Día</th>
          <th>Entrada</th>
          <th>Plato fondo</th>
        </tr>
      </thead>
      <tbody>
        {minute.days.map((row) => {
          let platoFondo: string = row.main;
          if (selectedMenu === "Vegetariano") platoFondo = row.veg;
          else if (selectedMenu === "Hipocalórico") platoFondo = row.hypo;

          return (
            <tr key={row.day}>
              <td><strong>{row.day}</strong></td>
              <td>{row.entry}</td>
              <td>
                {platoFondo}
                <div style={{ fontSize: "11px", color: "#015D8F", marginTop: "4px", fontWeight: 600 }}>
                  {selectedMenu !== "Común" ? `(Menú ${selectedMenu})` : ""}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* TABLA DE ALÉRGENOS (A la derecha) */}
  <div style={{ flex: "0 0 250px", width: "100%" }}>
    <div className="info-card" style={{ padding: "0", overflow: "hidden" }}>
      <div style={{ background: "#f1f5f9", padding: "10px 12px", borderBottom: "1px solid #cfd8df", fontWeight: 700, fontSize: "13px", color: "#334155" }}>
        Alérgenos del día
      </div>
      <table className="table" style={{ fontSize: "12px", border: "none" }}>
        <tbody>
          {minute.days.map((row) => (
            <tr key={`allergen-${row.day}`}>
              <td style={{ borderLeft: "none", width: "40px" }}><strong>{row.day.substring(0, 2)}</strong></td>
              <td style={{ borderRight: "none", color: "#dc2626", fontWeight: 500 }}>{row.allergens}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === "Mis reservas" && (
              <div className="section">
                <div style={{ borderBottom: "1px solid #d8dee5", paddingBottom: 10, marginBottom: 14 }}>
                  <h1 className="section__title">Mis reservas</h1>
                  <div className="section__subtitle">Edición directa para evitar anular y crear de nuevo.</div>
                </div>

                <div className="field-grid field-grid--aside">
                  <div className="field-grid">
                    <div className="stats">
                      <div className="stat">
                        <div className="stat__label">Almuerzos</div>
                        <div className="stat__value">{availableCounts.almuerzos}</div>
                      </div>
                      <div className="stat">
                        <div className="stat__label">Cenas</div>
                        <div className="stat__value">{availableCounts.cenas}</div>
                      </div>
                    </div>

                    {editingId != null && (
                      <div className="subpanel" style={{ background: "#f7fbfd" }}>
                        <div className="info-card__title" style={{ color: BLUE, display: "flex", alignItems: "center", gap: 8 }}>
                          <Sparkles className="icon-btn" />
                          Edición directa de reserva
                        </div>
                        <div className="field-grid field-grid--2">
                          <label className="field">
                            <span className="field__label">Campus o sede</span>
                            <select value={draftCampus} onChange={(e) => setDraftCampus(e.target.value)} className="field__select">
                              {campuses.map((campus) => <option key={campus}>{campus}</option>)}
                            </select>
                          </label>
                          <label className="field">
                            <span className="field__label">Menú</span>
                            <select value={draftMenu} onChange={(e) => setDraftMenu(e.target.value)} className="field__select">
                              {menuTypes.map((menu) => <option key={menu}>{menu}</option>)}
                            </select>
                          </label>
                        </div>
                        <div className="actions">
                          <button onClick={saveEdit} className="btn btn--primary"><CheckCircle2 className="icon-btn" />Guardar cambios</button>
                          <button onClick={() => setEditingId(null)} className="btn"><X className="icon-btn" />Cancelar edición</button>
                        </div>
                      </div>
                    )}

                    <div className="subpanel" style={{ padding: 0 }}>
                      <table className="table" style={{ fontSize: 14 }}>
                        <thead>
                          <tr>
                            <th>Acción</th>
                            <th>Fecha registro</th>
                            <th>Código reserva</th>
                            <th>Fecha desde</th>
                            <th>Fecha hasta</th>
                            <th>Menú</th>
                            <th>Campus/Sede reserva</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                              <td>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                  <button onClick={() => openEdit(reservation)} className="btn btn--primary">Editar</button>
                                  <button onClick={() => cancelReservation(reservation.id)} className="btn">Anular</button>
                                </div>
                              </td>
                              <td>{reservation.registeredAt}</td>
                              <td>{reservation.code}</td>
                              <td>{reservation.from}</td>
                              <td>{reservation.to}</td>
                              <td>{reservation.menu}</td>
                              <td>{reservation.campus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                  <div className="stats">
                    <div className="stat">
                      <div className="stat__label">Almuerzos</div>
                      <div className="stat__value">{availableCounts.almuerzos}</div>
                    </div>
                    <div className="stat">
                      <div className="stat__label">Cenas</div>
                      <div className="stat__value">{availableCounts.cenas}</div>
                    </div>
                  </div>
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
      {/* Renderizado condicional del mensaje de éxito (agregado 5) */}
            {feedbackMessage && (
              <div className="toast">
                <CheckCircle2 className="icon-btn" style={{ width: 20, height: 20 }} />
                {feedbackMessage}
              </div>
            )}
      <footer className="footer">Sitio web hecho con cariño por el grupo 6</footer>
    </div>
  );
}

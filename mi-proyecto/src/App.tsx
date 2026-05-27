import React, { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronDown, ChevronRight, HelpCircle, Menu, Plus, Save, Sparkles, X } from "lucide-react";

const campuses = ["San Joaquín", "Casa Central Valparaíso", "Viña del Mar", "Concepción"];
const menuTypes = ["Común", "Hipocalórico", "Vegetariano"];
const weekdays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

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

type Reservation = {
  id: number;
  code: string;
  registeredAt: string;
  from: string;
  to: string;
  menu: string;
  campus: string;
  status: string;
};

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

function App() {
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
  };

  const cancelReservation = (id: number) => {
    setReservations((current) => current.filter((r) => r.id !== id));
  };

  const sections = ["Reserva de menú", "Mis reservas", "Mis consumos", "Minuta"];

  return (
    <div className="app-shell">
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { height: 100%; }
        body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #edf0f2; color: #1f2937; }
        button, input, select { font: inherit; }
        .app-shell { min-height: 100vh; background: #edf0f2; }
        .container { max-width: 1440px; margin: 0 auto; }
        .top-strip { background: #156f9c; color: #fff; }
        .top-strip__inner { display: flex; justify-content: space-between; align-items: center; padding: 6px 16px; font-size: 12px; font-weight: 700; }
        .header { background: #fff; border-bottom: 1px solid #d1d5db; }
        .header__inner { display: flex; justify-content: space-between; align-items: center; padding: 18px 16px; }
        .brand { display: flex; align-items: center; gap: 16px; }
        .brand__logo { width: 60px; height: 60px; background: #e5e7eb; border-radius: 2px; display: grid; place-items: center; color: #6b7280; font-size: 12px; font-weight: 700; }
        .brand__text-small { font-size: 11px; color: #6b7280; letter-spacing: 0.22em; }
        .brand__text-big { font-size: 16px; font-weight: 700; color: #374151; letter-spacing: 0.18em; }
        .menu-btn { background: #156f9c; color: #fff; border: 0; width: 48px; height: 48px; border-radius: 2px; display: grid; place-items: center; }
        .main-grid { display: grid; grid-template-columns: 280px 1fr; gap: 12px; padding: 12px; align-items: start; }
        .sidebar { background: #156f9c; border: 1px solid #aeb9c2; border-radius: 2px; overflow: hidden; }
        .sidebar__item { width: 100%; background: #156f9c; color: #fff; border: 0; border-bottom: 1px solid rgba(0,0,0,.12); text-align: left; padding: 14px 16px; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: space-between; }
        .sidebar__item--active { background: #0f5f87; }
        .content { background: #fff; border: 1px solid #cfd8df; border-radius: 2px; overflow: hidden; min-height: 78vh; }
        .section { padding: 14px; }
        .section__title { font-size: 17px; margin: 0; color: #334155; }
        .section__subtitle { font-size: 13px; color: #6b7280; margin-top: 4px; }
        .panel { border: 1px solid #d8dee5; border-radius: 2px; background: #fff; }
        .panel--soft { background: #f7fbfd; }
        .field-grid { display: grid; gap: 14px; }
        .field-grid--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .field-grid--aside { grid-template-columns: 1fr 270px; }
        .field { display: flex; flex-direction: column; gap: 6px; font-size: 14px; }
        .field__label { font-weight: 700; color: #334155; }
        .field__input, .field__select { width: 100%; border: 1px solid #cfd8df; background: #fff; padding: 9px 12px; border-radius: 2px; }
        .field__input[readonly] { background: #f3f4f6; }
        .calendar { border: 1px solid #cfd8df; border-radius: 2px; background: #fff; padding: 14px; }
        .calendar__legend { display: flex; align-items: center; gap: 8px; color: #475569; font-size: 14px; margin-bottom: 10px; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; }
        .calendar-grid__head { font-weight: 700; color: #6b7280; font-size: 12px; }
        .calendar-day { border: 1px solid #cfd8df; background: #fff; border-radius: 2px; padding: 8px 0; font-size: 14px; cursor: pointer; }
        .calendar-day--active { background: #156f9c; color: #fff; border-color: #156f9c; }
        .actions { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 12px; border-top: 1px solid #e5e7eb; }
        .btn { border-radius: 2px; border: 1px solid #cfd8df; background: #fff; color: #334155; padding: 9px 14px; font-size: 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
        .btn--primary { background: #156f9c; border-color: #156f9c; color: #fff; }
        .info-card { padding: 14px; border: 1px solid #d8dee5; border-radius: 2px; background: #f7fbfd; font-size: 14px; color: #334155; }
        .info-card__title { font-weight: 700; margin-bottom: 8px; }
        .stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .stat { border: 1px solid #d8dee5; border-radius: 2px; background: #f7fbfd; padding: 14px; text-align: center; }
        .stat__label { font-size: 14px; color: #6b7280; }
        .stat__value { margin-top: 4px; font-size: 38px; line-height: 1; color: #156f9c; font-weight: 700; }
        .subpanel { border: 1px solid #d8dee5; border-radius: 2px; background: #fff; padding: 14px; }
        .subpanel__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .badge { background: #e6f2f7; color: #156f9c; padding: 4px 8px; border-radius: 2px; font-weight: 700; font-size: 12px; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { border: 1px solid #cfd8df; padding: 10px 12px; vertical-align: top; }
        .table thead th { background: #f1f5f9; color: #334155; font-weight: 700; }
        .table--blue thead th { background: #156f9c; color: #fff; }
        .table tbody tr:nth-child(even) { background: #f8fafc; }
        .table tbody tr:nth-child(odd) { background: #fff; }
        .mini { font-size: 12px; color: #6b7280; }
        .footer { margin-top: 12px; background: #111827; color: #fff; padding: 12px 16px; font-size: 14px; }
        .icon-btn { width: 18px; height: 18px; }
        .muted { color: #6b7280; }
        .helpbox { margin-top: 12px; }
        @media (max-width: 1100px) {
          .main-grid { grid-template-columns: 1fr; }
          .field-grid--aside { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .field-grid--2 { grid-template-columns: 1fr; }
          .stats { grid-template-columns: 1fr; }
          .header__inner { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>

      <div className="top-strip">
        <div className="container top-strip__inner">
          <div>USM.cl</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span>Rodrigo Caceres</span>
            <button className="btn" style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}>Cerrar sesión</button>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <div className="brand__logo">USM</div>
            <div>
              <div className="brand__text-small">UNIVERSIDAD TÉCNICA</div>
              <div className="brand__text-big">FEDERICO SANTA MARÍA</div>
            </div>
          </div>
          <button className="menu-btn" aria-label="Menú">
            <Menu className="icon-btn" />
          </button>
        </div>
      </header>

      <main className="container">
        <div className="main-grid">
          <aside className="sidebar">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`sidebar__item ${activeSection === section ? "sidebar__item--active" : ""}`}
              >
                <span>{section}</span>
                {section === "Minuta" ? <ChevronDown className="icon-btn" /> : null}
              </button>
            ))}
          </aside>

          <section className="content">
            {activeSection === "Reserva de menú" && (
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
                        <input value="RODRIGO ARIEL CACERES GAETE" readOnly className="field__input" style={{ textTransform: "uppercase" }} />
                      </label>
                      <label className="field">
                        <span className="field__label">Campus o sede</span>
                        <select value={selectedCampus} onChange={(e) => { setSelectedCampus(e.target.value as keyof typeof minuteByCampus); setDraftCampus(e.target.value); }} className="field__select">
                          {campuses.map((campus) => <option key={campus}>{campus}</option>)}
                        </select>
                      </label>
                      <label className="field">
                        <span className="field__label">Menú</span>
                        <select value={selectedMenu} onChange={(e) => { setSelectedMenu(e.target.value); setDraftMenu(e.target.value); }} className="field__select">
                          {menuTypes.map((menu) => <option key={menu}>{menu}</option>)}
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

                      <div className="info-card">
                        <div className="info-card__title">Contenido de interés</div>
                        <p>• Cambios directos de reserva.</p>
                        <p>• Información de alérgenos visible antes de confirmar.</p>
                        <p>• Minuta integrada sin salir de la página.</p>
                      </div>
                    </div>

                    <div className="actions">
                      <button className="btn">
                        <Plus className="icon-btn" />
                        Reservar
                      </button>
                      <button className="btn btn--primary">
                        <Save className="icon-btn" />
                        Guardar borrador
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

                  {showHelp && (
                    <div className="subpanel helpbox">
                      <div className="info-card__title">Ayuda</div>
                      <p className="muted">Este prototipo ya simula reserva, edición directa y minuta integrada en la misma vista.</p>
                    </div>
                  )}

                  {showMinute && (
                    <div className="subpanel helpbox">
                      <div className="subpanel__header">
                        <div>
                          <h2 className="section__title" style={{ fontSize: 16, margin: 0 }}>Minuta</h2>
                          <div className="mini">{minute.subtitle} · {selectedCampus}</div>
                        </div>
                        <span className="badge">En la misma página</span>
                      </div>
                      <div style={{ overflowX: "auto" }}>
                        <table className="table table--blue" style={{ minWidth: 700 }}>
                          <thead>
                            <tr>
                              <th>Día</th>
                              <th>Entrada</th>
                              <th>Plato fondo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {minute.days.map((row) => (
                              <tr key={row.day}>
                                <td><strong>{row.day}</strong></td>
                                <td>{row.entry}</td>
                                <td>{row.main}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="info-card" style={{ marginTop: 12 }}>
                        <strong>Alergénos:</strong> visibles antes de confirmar, en el mismo flujo.
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
                        <div className="info-card__title" style={{ color: "#156f9c", display: "flex", alignItems: "center", gap: 8 }}>
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

            {activeSection === "Minuta" && (
              <div className="section">
                <div style={{ borderBottom: "1px solid #d8dee5", paddingBottom: 10, marginBottom: 14 }}>
                  <h1 className="section__title">Minuta</h1>
                  <div className="section__subtitle">Ya no redirige: se ve en la misma pantalla.</div>
                </div>

                <div className="panel panel--soft" style={{ padding: 12, marginBottom: 16, display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <div className="muted">Selecciona sede para cambiar la minuta</div>
                  <select value={selectedCampus} onChange={(e) => setSelectedCampus(e.target.value as keyof typeof minuteByCampus)} className="field__select" style={{ width: 260 }}>
                    {campuses.map((campus) => <option key={campus}>{campus}</option>)}
                  </select>
                </div>

                <div className="field-grid" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
                  <div className="subpanel" style={{ padding: 0, overflowX: "auto" }}>
                    <table className="table table--blue" style={{ minWidth: 700, fontSize: 12 }}>
                      <thead>
                        <tr>
                          <th>{minute.title}</th>
                          <th>Lunes</th>
                          <th>Martes</th>
                          <th>Miércoles</th>
                          <th>Jueves</th>
                          <th>Viernes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Entrada</strong></td>
                          {minute.days.map((d) => <td key={d.day}>{d.entry}</td>)}
                        </tr>
                        <tr>
                          <td><strong>Plato fondo</strong></td>
                          {minute.days.map((d) => <td key={d.day}>{d.main}</td>)}
                        </tr>
                        <tr>
                          <td><strong>Vegetariano</strong></td>
                          {minute.days.map((d) => <td key={d.day}>{d.veg}</td>)}
                        </tr>
                        <tr>
                          <td><strong>Hipocalórico</strong></td>
                          {minute.days.map((d) => <td key={d.day}>{d.hypo}</td>)}
                        </tr>
                        <tr>
                          <td><strong>Postre / alérgenos</strong></td>
                          {minute.days.map((d) => <td key={d.day}>{d.dessert} · {d.allergens}</td>)}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="info-card">
                    <div className="info-card__title">Por qué se ve así</div>
                    <p>La minuta comparte el mismo marco visual del sistema, pero se mantiene legible sin romper la página.</p>
                    <p>El usuario sigue viendo la reserva junto con la información alimentaria relevante.</p>
                    <p>Más adelante esto puede evolucionar a una tarjeta por día o a datos reales del backend.</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="footer">Sitio web administrado por Dirección General de Sistemas de Gestión</footer>
    </div>
  );
}

export default App;

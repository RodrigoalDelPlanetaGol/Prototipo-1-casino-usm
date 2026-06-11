import { minuteByCampus, ALL_ALLERGENS } from "../data/casinoData";
import type { AllergenId, DayMenu } from "../data/casinoData";

type MinutePreviewProps = {
  selectedCampus: keyof typeof minuteByCampus;
  selectedMenu: string;
  showMinute: boolean;
};

function getAllergensForDay(day: DayMenu, selectedMenu: string): AllergenId[] {
  const base = [...day.allergens.entry, ...day.allergens.dessert];
  if (selectedMenu === "Vegetariano") {
    return Array.from(new Set([...base, ...day.allergens.veg]));
  } else if (selectedMenu === "Hipocalórico") {
    return Array.from(new Set([...base, ...day.allergens.hypo]));
  }
  return Array.from(new Set([...base, ...day.allergens.main]));
}

function getWeekAllergens(days: DayMenu[], selectedMenu: string): AllergenId[] {
  const all = new Set<AllergenId>();
  days.forEach((day) => {
    getAllergensForDay(day, selectedMenu).forEach((a) => all.add(a));
  });
  return Array.from(all);
}

export default function MinutePreview({
  selectedCampus,
  selectedMenu,
  showMinute,
}: MinutePreviewProps) {
  if (!showMinute) return null;

  const minute = minuteByCampus[selectedCampus];
  const weekAllergens = getWeekAllergens(minute.days, selectedMenu);

  return (
    <div className="subpanel helpbox">
      {/* Encabezado */}
      <div className="minute-header">
        <div>
          <h2 className="section__title" style={{ fontSize: 20, margin: 0 }}>
            Minuta semanal
          </h2>
          <div className="section__subtitle">
            {selectedCampus} · {minute.subtitle}
          </div>
        </div>
        <span
          className={`menu-badge menu-badge--${
            selectedMenu === "Común"
              ? "comun"
              : selectedMenu === "Hipocalórico"
              ? "hipo"
              : "veg"
          }`}
        >
          {selectedMenu}
        </span>
      </div>

      {/* Tabla de menú */}
      <div style={{ overflowX: "auto", marginTop: 14 }}>
        <table className="table table--blue minute-table">
          <thead>
            <tr>
              <th style={{ width: 100 }}>Día</th>
              <th>Entrada</th>
              <th>Plato de fondo</th>
              <th>Postre</th>
            </tr>
          </thead>
          <tbody>
            {minute.days.map((row) => {
              let platoFondo: string = row.main;
              if (selectedMenu === "Vegetariano") platoFondo = row.veg;
              else if (selectedMenu === "Hipocalórico") platoFondo = row.hypo;

              const dayAllergens = getAllergensForDay(row, selectedMenu);

              return (
                <tr key={row.day}>
                  <td>
                    <strong>{row.day}</strong>
                  </td>
                  <td>{row.entry}</td>
                  <td>
                    <div>{platoFondo}</div>
                    {dayAllergens.length > 0 && (
                      <div className="allergen-pills-row">
                        {dayAllergens.map((id) => {
                          const def = ALL_ALLERGENS.find((a) => a.id === id);
                          return def ? (
                            <span key={id} className="allergen-pill" title={def.label}>
                              {def.emoji} {def.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                  </td>
                  <td>{row.dessert}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tabla de alérgenos semanal */}
      <div className="allergen-section">
        <div className="allergen-section__title">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Tabla de alérgenos — Menú {selectedMenu}
        </div>

        {weekAllergens.length === 0 ? (
          <div className="allergen-empty">
            ✅ No se registran alérgenos relevantes para este menú esta semana.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table allergen-table">
              <thead>
                <tr>
                  <th style={{ width: 110 }}>Alérgeno</th>
                  {minute.days.map((d) => (
                    <th key={d.day} style={{ textAlign: "center" }}>
                      {d.day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekAllergens.map((id) => {
                  const def = ALL_ALLERGENS.find((a) => a.id === id)!;
                  return (
                    <tr key={id}>
                      <td>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontWeight: 600,
                            fontSize: 13,
                          }}
                        >
                          <span>{def.emoji}</span>
                          {def.label}
                        </span>
                      </td>
                      {minute.days.map((row) => {
                        const dayAll = getAllergensForDay(row, selectedMenu);
                        const present = dayAll.includes(id);
                        return (
                          <td
                            key={row.day}
                            style={{ textAlign: "center", padding: "8px 6px" }}
                          >
                            {present ? (
                              <span
                                className="allergen-check allergen-check--yes"
                                title="Contiene"
                              >
                                ⚠
                              </span>
                            ) : (
                              <span
                                className="allergen-check allergen-check--no"
                                title="No contiene"
                              >
                                ✓
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="allergen-legend">
          <span>
            <span className="allergen-check allergen-check--yes">⚠</span> Contiene este alérgeno
          </span>
          <span>
            <span className="allergen-check allergen-check--no">✓</span> Sin este alérgeno
          </span>
        </div>

        <p className="allergen-disclaimer">
          Esta información es orientativa. Puede existir contaminación cruzada en la cocina. Si
          tienes una alergia grave, consulta directamente con el equipo del casino.
        </p>
      </div>
    </div>
  );
}

import type { Dispatch, SetStateAction } from "react";
import { minuteByCampus } from "../data/casinoData";

type MinutePreviewProps = {
  selectedCampus: keyof typeof minuteByCampus;
  selectedMenu: string;
  showMinute: boolean;
};

export default function MinutePreview({
  selectedCampus,
  selectedMenu,
  showMinute,
}: MinutePreviewProps) {
  if (!showMinute) return null;

  const minute = minuteByCampus[selectedCampus];

  return (
    <div className="subpanel helpbox">
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <h2 className="section__title" style={{ fontSize: 24, margin: 0 }}>
          Minuta
        </h2>
        <div className="section__title">
          {minute.subtitle} · {selectedCampus}
        </div>
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
            {minute.days.map((row) => {
              let platoFondo: string = row.main;

              if (selectedMenu === "Vegetariano") {
                platoFondo = row.veg;
              } else if (selectedMenu === "Hipocalórico") {
                platoFondo = row.hypo;
              }

              return (
                <tr key={row.day}>
                  <td>
                    <strong>{row.day}</strong>
                  </td>
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
    </div>
  );
}
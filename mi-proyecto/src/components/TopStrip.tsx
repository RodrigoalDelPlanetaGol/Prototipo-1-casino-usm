import { Menu } from "lucide-react";

type TopStripProps = {
  onMenuToggle: () => void;
  onHelpClick: () => void;
};

export default function TopStrip({ onMenuToggle, onHelpClick }: TopStripProps) {
  return (
    <div className="top-strip">
      <div className="container top-strip__inner">
        <div>USM.cl</div>

        <div className="top-strip__right desktop-top-actions">
          <button
            className="btn"
            style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}
            onClick={onHelpClick}
          >
            Minuta ▾
          </button>
          <span>Rodrigo Caceres</span>
          <button
            className="btn"
            style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}
          >
            Cerrar sesión
          </button>
        </div>

        <button className="menu-btn mobile-top-menu" aria-label="Menú" onClick={onMenuToggle}>
          <Menu className="icon-btn" />
        </button>
      </div>
    </div>
  );
}
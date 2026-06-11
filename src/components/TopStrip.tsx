type TopStripProps = {};

export default function TopStrip() {
  return (
    <div className="top-strip">
      <div className="container top-strip__inner">
        <div>USM.cl</div>

        <div className="top-strip__right">
          <span className="top-strip__user">Manuel Tezanos</span>

          <div className="top-strip__desktop-actions">
            <button
              className="btn"
              style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}
            >
              Minuta ▾
            </button>
            <button
              className="btn"
              style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
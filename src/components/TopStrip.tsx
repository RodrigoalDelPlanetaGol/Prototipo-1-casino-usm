type TopStripProps = {};

export default function TopStrip() {
  return (
    <div className="top-strip">
      <div className="container top-strip__inner">
        <div>USM.cl</div>

        <div className="top-strip__right desktop-top-actions">
          <button
            className="btn"
            style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}
          >
            Minuta ▾
          </button>
          <span>Manuel Tezanos</span>
          <button
            className="btn"
            style={{ color: "#fff", borderColor: "transparent", background: "transparent", padding: 0 }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
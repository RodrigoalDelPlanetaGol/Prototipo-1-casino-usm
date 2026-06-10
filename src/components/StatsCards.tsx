type StatsCardsProps = {
  almuerzos: number;
  cenas: number;
};

export default function StatsCards({ almuerzos, cenas }: StatsCardsProps) {
  return (
    <div className="stats">
      <div className="stat">
        <div className="stat__label">Almuerzos</div>
        <div className="stat__value">{almuerzos}</div>
      </div>

      <div className="stat">
        <div className="stat__label">Cenas</div>
        <div className="stat__value">{cenas}</div>
      </div>
    </div>
  );
}
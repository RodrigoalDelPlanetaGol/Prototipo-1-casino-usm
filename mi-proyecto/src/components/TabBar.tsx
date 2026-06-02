import { sections } from "../data/casinoData";

type TabBarProps = {
  activeSection: string;
  onSelectSection: (section: string) => void;
};

export default function TabBar({ activeSection, onSelectSection }: TabBarProps) {
  return (
    <div className="tabs" role="tablist" aria-label="Navegación del casino">
      {sections.map((section) => (
        <button
          key={section}
          role="tab"
          aria-selected={activeSection === section}
          onClick={() => onSelectSection(section)}
          className={`tab ${activeSection === section ? "tab--active" : ""}`}
        >
          {section}
        </button>
      ))}
    </div>
  );
}
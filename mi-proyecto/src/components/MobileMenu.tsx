import { sections } from "../data/casinoData";

type MobileMenuProps = {
  open: boolean;
  activeSection: string;
  onSelectSection: (section: string) => void;
};

export default function MobileMenu({ open, activeSection, onSelectSection }: MobileMenuProps) {
  return (
    <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onSelectSection(section)}
          className={`sidebar__item ${activeSection === section ? "sidebar__item--active" : ""}`}
        >
          <span>{section}</span>
        </button>
      ))}
    </div>
  );
}
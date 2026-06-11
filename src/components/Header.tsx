import { Menu } from "lucide-react";
import UsmLogo from "./UsmLogo";

type HeaderProps = {
  onMenuToggle: () => void;
  showMenuButton: boolean;
};

export default function Header({ onMenuToggle, showMenuButton }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand">
          <UsmLogo />
        </div>

        {showMenuButton && (
          <button className="menu-btn" aria-label="Menú" onClick={onMenuToggle}>
            <Menu className="icon-btn" />
          </button>
        )}
      </div>
    </header>
  );
}
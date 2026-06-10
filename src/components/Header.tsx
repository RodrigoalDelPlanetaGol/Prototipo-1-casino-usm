import { Menu } from "lucide-react";
import UsmLogo from "./UsmLogo";

type HeaderProps = {
  onMenuToggle: () => void;
};

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand">
          <UsmLogo />
        </div>

        <button className="menu-btn" aria-label="Menú" onClick={onMenuToggle}>
          <Menu className="icon-btn" />
        </button>
      </div>
    </header>
  );
}
import DesktopNavigationMenu from "./menu-desktop";
import MobileNavigationMenu from "./menu-mobile";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* DESKTOP*/}
      <DesktopNavigationMenu />

      {/* MOBILE */}
      <MobileNavigationMenu />
    </div>
  );
};

export default Menu;

import Logo from "./Logo";
import CreateAiBlog from "./CreateAiBlog";
import NotificationBell from "./NotificationBell";

export default function Header() {
  return (
    <header className="flex fixed sm:justify-start sm:flex-nowrap z-10 w-full bg-[#0e1217]/30 backdrop-blur-md max-[320px]:p-5 border-b text-sm py-3 sm:py-0 border-[#8c52ff] shadow-[#8c52ff] shadow-md">
      <nav
        className="relative flex items-center max-[325px]:justify-center min-h-[84px] max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Logo />
        </div>
        <div className="flex items-center space-x-4">
          <CreateAiBlog />
          <NotificationBell />
        </div>
      </nav>
    </header>
  );
}

import Logo from "./Logo";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="py-3 px-4 flex items-center justify-between shadow-md h-[10vh] ">
      <Logo />
      <NavBar />
    </header>
  );
}

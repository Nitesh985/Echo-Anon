import { RxGlobe } from "react-icons/rx";

function Header() {
  return (
    <header className="flex justify-between px-10 py-8 items-center bg-slate-800" >
        <h1 className="text-3xl font-bold flex items-center gap-2" >
        <RxGlobe />
        <span>URL Page</span>
        </h1>
      <nav>
      </nav>
    </header>
  )
}

export default Header
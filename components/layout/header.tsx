import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { CiSearch, CiChat1 } from "react-icons/ci";
import Image from "next/image";
import Logo from "@/public/logo.png";

export default function Header() {
  return (
    <header className="w-full h-fit p-6 bg-background border-b !border-red-700 text-red-700">
      <div className="max-w-[1400px] mx-auto flex flex-row gap-8 items-center">
        <Link href="/application" className="mr-auto">
          <h1 className="flex space-x-3 items-center uppercase text-2xl md:text-3xl text-red-700 font-medium tracking-widest">
            <Image src={Logo} alt="TrustLink logo" className="w-8 h-8 brightness-200"/>
            <span>TrustLink</span>
          </h1>
        </Link>
        <div className="flex flex-row items-center h-6 font-semibold">
        <CiSearch color="text-red-800" size={24} />
          <Link
            href="/application"
            className={
              `relative after:absolute after:h-full text-nowrap after:bg-red-700 after:text-center after:rounded-lg px-2 ` +
              `after:px-2 after:content-['Strona_główna'] after:left-0 after:hover:w-full after:text-transparent after:opacity-0 ` +
              `after:hover:opacity-100 after:hover:text-background after:w-0 after:transition-all after:origin-left after:duration-500`
            }
          >
            Strona główna
          </Link>
          <Separator orientation="vertical" className="bg-red-700 mx-4" />
          <CiChat1 color="text-red-800" size={24} />
          <Link
            className={
              `relative after:absolute after:h-full after:bg-red-700 after:text-center after:rounded-lg px-2 ` +
              `after:px-2 after:content-['Czat'] after:left-0 after:hover:w-full after:text-transparent after:opacity-0 ` +
              `after:hover:opacity-100 after:hover:text-background after:w-0 after:transition-all after:origin-left after:duration-500`
            }
            href="/chat"
          >
            Czat
          </Link>
        </div>
        <UserButton />
      </div>
    </header>
  );
}

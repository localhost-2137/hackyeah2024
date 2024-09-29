import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Header() {
  return (
    <header className="w-full h-fit p-6 bg-background border-b !border-red-700 text-red-700">
      <div className="max-w-[1400px] mx-auto flex flex-row gap-8 items-center">
        <h1 className="text-4xl font-semibold mr-auto">
          <Link href="/application">TrustLink</Link>
        </h1>
        <div className="flex flex-row items-center gap-4 h-6 font-semibold">
          <Link
            href="/application"
            className={
              `relative after:absolute after:h-full after:bg-red-700 after:text-center after:rounded-lg px-2` +
              `after:px-2 after:content-['Czat'] after:left-0 after:hover:w-full after:text-transparent after:opacity-0` +
              `after:hover:opacity-100 after:hover:text-background after:w-0 after:transition-all after:origin-left after:duration-500`
            }
          >
            Wyszukiwarka
          </Link>
          <Separator orientation="vertical" className="bg-red-700" />
          <Link
            className={
              `relative after:absolute after:h-full after:bg-red-700 after:text-center after:rounded-lg px-2` +
              `after:px-2 after:content-['Czat'] after:left-0 after:hover:w-full after:text-transparent after:opacity-0` +
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

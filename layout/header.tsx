import {UserButton} from "@/components/auth/user-button";
import Link from "next/link";

export default function Header() {

    return (
        <header className="w-full p-6 bg-red-700 text-white shadow">
            <div className="max-w-[1400px] m-[80%] mx-auto flex flex-row justify-between items-center">
                <h1 className="text-4xl font-semibold">
                    <Link href="/application">TrustLink</Link>
                </h1>
                <div className="flex flex-row gap-4 font-semibold">
                    <Link href="/application">Wyszukiwarka</Link>
                    <Link href="/chat">Czat</Link>
                </div>
                <UserButton/>
            </div>
        </header>
    )
}

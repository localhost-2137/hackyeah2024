import { auth } from "@/auth"
import { UserButton } from "@/components/auth/user-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SettingsForm from "./components/SettingsForm";

interface ISession {
    user: {
        name: string,
        email: string,
        image: string,
        id: string
    },
    expires: string
}

const SettingsPage = async () => {
    const session = await auth();

    if (!session || !session.user) {
        return <p>Unauthorized</p>
    }

    return (
        <main className="p-10">
            <Card className="max-w-[1400px] mx-auto p-5">
                <CardHeader className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl font-semibold">Ustawienia</h1>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <SettingsForm />
                </CardContent>
            </Card>
        </main>
    )
};

export default SettingsPage;

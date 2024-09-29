<<<<<<< HEAD
import { auth } from "@/auth"
import { UserButton } from "@/components/auth/user-button";
=======
import {auth} from "@/auth"
import {UserButton} from "@/components/auth/user-button";
import {Session} from "next-auth";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

interface ISession {
    user: {
        name: string,
        email: string,
        image: string,
        id: string
    },
    expires: string
}
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3

const SettingsPage = async () => {
    const session = await auth();

<<<<<<< HEAD
    return (
        <div>
            {JSON.stringify(session)}
            <UserButton />
        </div>
    )
};

export default SettingsPage;
=======
    if (!session || !session.user) {
        return <p>Unauthorized</p>
    }

    return (
        <main className="p-10">
            <Card className="max-w-[1400px] mx-auto p-5">
                <CardHeader className="flex flex-row justify-between items-center">

                    <h1 className="text-2xl font-semibold">Profile Settings</h1>
                    <UserButton/>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <p>Id: {session.user.id}</p>
                    <p>Nazwa: {session.user.name}</p>
                    <p>Email: {session.user.email}</p>
                </CardContent>
            </Card>
        </main>
    )
};

export default SettingsPage;
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3

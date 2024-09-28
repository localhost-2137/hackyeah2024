import { auth } from "@/auth"
import { UserButton } from "@/components/auth/user-button";

const SettingsPage = async () => {
    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}
            <UserButton />
        </div>
    )
};

export default SettingsPage;
import CompanyCard from "@/components/application/company-card";
import {Label} from "@/components/ui/label";
import UsersFilter from "./components/UsersFilter";
import {getUserList} from "@/actions/user-list";
import {UserType} from "@prisma/client";
import UserCard from "@/components/application/user-card";
import Link from "next/link";
import UsersSearch from "@/app/(protected)/application/components/UsersSearch";
import {search} from "@/actions/search";
import {getUser} from "@/actions/user-data";
import {redirect} from "next/navigation";

interface SearchProps {
    searchParams: {
        type?: string;
        search?: string;
    };
}

const ApplicationPage = async ({searchParams}: SearchProps) => {
    const currentUser = await getUser();

    if (!currentUser?.data?.isFulfilled) {
        redirect("/fulfill");
    }

    const recommended: any = await getUserList(3, 0);
    let users: any = searchParams.search ? await search(searchParams.search, 10, 0) : await getUserList(100, 0, searchParams.type as UserType);
    if (users.length > 0) {
        users = users.filter(
            (user: any) => !recommended.find((rec: any) => rec.id === user.id)
        );
    }

    return (
        <div className="container my-8 flex flex-col gap-2">
            <div className="w-full p-8 rounded-lg mt-8">
                <h3 className="text-3xl font-semibold mb-4">Polecane dla Ciebie</h3>
                <div className="flex flex-row gap-2">
                    {recommended.map((company: any, i: number) => (
                        <Link
                            key={company.name}
                            href={`/user/${company.id}`}
                            className="w-[40%] h-48"
                        >
                            <UserCard
                                key={company.name}
                                img={company.img}
                                name={company.name}
                                description={company.description}
                                tags={company.tags}
                                index={i}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="w-full bg-background p-8 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-3xl font-semibold">Wszystkie</h3>
                    <UsersSearch/>
                    <div className="flex flex-row gap-2 items-center">
                        <Label>Wybierz typ</Label>
                        <UsersFilter/>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap w-full gap-4">
                    {users.length > 0 ? (
                        users.map((company: any, i: number) => (
                            <Link
                                className="flex-1 min-w-[35%] h-56"
                                key={company.name}
                                href={`/user/${company.id}`}
                            >
                                <CompanyCard
                                    img={company.image!}
                                    name={company.name!}
                                    description={company.description!}
                                    tags={company.tags}
                                    index={i}
                                />
                            </Link>
                        ))
                    ) : (
                        <p className="w-full text-center p-5">Brak wyników</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationPage;

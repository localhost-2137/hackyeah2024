import CompanyCard from "@/components/application/company-card";
import { Label } from "@/components/ui/label";
import UsersFilter from "./components/UsersFilter";
import { getUserList } from "@/actions/user-list";
import { UserType } from "@prisma/client";
import UserCard from "@/components/application/user-card";

const companies = [
  {
    name: "Company 1",
    img: "https://placehold.co/100x100",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["tag1", "tag2"],
  },
  {
    name: "Company 1",
    img: "https://placehold.co/100x100",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["tag1", "tag2", "tag3", "tag3", "tag3"],
  },
  {
    name: "Company 1",
    img: "https://placehold.co/100x100",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["tag1", "tag2"],
  },
];

interface SearchProps {
  searchParams: {
    type: string;
  };
}

const ApplicationPage = async ({ searchParams }: SearchProps) => {
  const users: any = await getUserList(100, 0, searchParams.type as UserType);
  return (
    <div className="container mt-2 flex flex-col gap-2">
      <div className="w-full bg-background p-8 rounded-lg shadow mt-8">
        <h3 className="text-3xl font-semibold mb-4">Polecane</h3>
        <div className="flex flex-row gap-2">
          {companies.map((company: any, i: number) => (
            <UserCard
              key={company.name}
              img={company.img}
              name={company.name}
              description={company.description}
              tags={company.tags}
              index={i}
            />
          ))}
        </div>
      </div>
      <div className="w-full bg-background p-8 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-3xl">Wszystkie</h3>
          <div className="flex flex-row gap-2 items-center">
            <Label>Wybierz typ</Label>
            <UsersFilter />
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {users.length > 0 ? (
            users.map((company: any, i: number) => (
              <CompanyCard
                key={company.name}
                img={company.image!}
                name={company.name!}
                description={company.description!}
                tags={company.tags}
                index={i}
              />
            ))
          ) : (
            <p className="w-full text-center">Brak wyników</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;

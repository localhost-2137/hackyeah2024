import CompanyCard from "@/components/application/company-card";
import { Label } from "@/components/ui/label";
import UsersFilter from "./components/UsersFilter";
import { getUserList } from "@/actions/user-list";
import { UserType } from "@prisma/client";

const companies = [
    {
        name: "Company 1",
        img: "https://scontent-waw2-1.xx.fbcdn.net/v/t1.15752-9/461520324_849314330599019_7208267945721936725_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=qgdrVqS5St0Q7kNvgFmDpHU&_nc_ht=scontent-waw2-1.xx&_nc_gid=Asg7zd1_GM8VoSfChcmCEB6&oh=03_Q7cD1QEesAFTcIN1WJXztnc-2Hxs22dhWXu6ROtQHlImskp-LA&oe=671FD256",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tags: ["tag1", "tag2"],
    },
    {
        name: "Company 1",
        img: "https://scontent-waw2-1.xx.fbcdn.net/v/t1.15752-9/461520324_849314330599019_7208267945721936725_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=qgdrVqS5St0Q7kNvgFmDpHU&_nc_ht=scontent-waw2-1.xx&_nc_gid=Asg7zd1_GM8VoSfChcmCEB6&oh=03_Q7cD1QEesAFTcIN1WJXztnc-2Hxs22dhWXu6ROtQHlImskp-LA&oe=671FD256",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tags: ["tag1", "tag2"],
    },
    {
        name: "Company 1",
        img: "https://scontent-waw2-1.xx.fbcdn.net/v/t1.15752-9/461520324_849314330599019_7208267945721936725_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=qgdrVqS5St0Q7kNvgFmDpHU&_nc_ht=scontent-waw2-1.xx&_nc_gid=Asg7zd1_GM8VoSfChcmCEB6&oh=03_Q7cD1QEesAFTcIN1WJXztnc-2Hxs22dhWXu6ROtQHlImskp-LA&oe=671FD256",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tags: ["tag1", "tag2"],
    },
    {
        name: "Company 1",
        img: "https://scontent-waw2-1.xx.fbcdn.net/v/t1.15752-9/461520324_849314330599019_7208267945721936725_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=qgdrVqS5St0Q7kNvgFmDpHU&_nc_ht=scontent-waw2-1.xx&_nc_gid=Asg7zd1_GM8VoSfChcmCEB6&oh=03_Q7cD1QEesAFTcIN1WJXztnc-2Hxs22dhWXu6ROtQHlImskp-LA&oe=671FD256",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tags: ["tag1", "tag2"],
    },
    {
        name: "Company 1",
        img: "https://scontent-waw2-1.xx.fbcdn.net/v/t1.15752-9/461520324_849314330599019_7208267945721936725_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=qgdrVqS5St0Q7kNvgFmDpHU&_nc_ht=scontent-waw2-1.xx&_nc_gid=Asg7zd1_GM8VoSfChcmCEB6&oh=03_Q7cD1QEesAFTcIN1WJXztnc-2Hxs22dhWXu6ROtQHlImskp-LA&oe=671FD256",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        tags: ["tag1", "tag2"],
    }
];

interface SearchProps {
    searchParams: {
        type: string;
    }
}

const ApplicationPage = async ({ searchParams }: SearchProps) => {
    const users = await getUserList(100, 0, searchParams.type as UserType);
    return (
        <div className="container mt-2 flex flex-col gap-2">
            <h3 className="text-3xl">Przeglądaj</h3>
            <div className="flex flex-row gap-2 items-center">
                <Label>Wybierz typ</Label>
                <UsersFilter />
            </div>
            <div className="flex flex-col gap-2">
                {users.map((company) => (
                    <CompanyCard key={company.name} img={company.image!} name={company.name!} description={company.description!} tags={company.tags} />
                ))}
            </div>
        </div>
    );

};

export default ApplicationPage;
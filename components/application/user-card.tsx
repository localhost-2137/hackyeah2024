import Image from "next/image";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface UserCardProps {
    name?: string;
    img?: string;
    description?: string;
    tags?: string[];
}

const UserCard: React.FC<UserCardProps> = ({ name, img, description, tags }) => {
    return (
        <Card className="p-5 w-[40%] h-">
            <CardContent className="flex flex-row justify-between gap-2">
                <div className="flex flex-col gap-5">
                    <CardTitle className="text-3xl">{name}</CardTitle>
                    <div className="flex flex-row gap-2 text-wrap max-w-[80%]">
                        <>{description!.split(" ").slice(0, 20).join(" ")}...</>
                    </div>
                    <div className="flex flex-row gap-2">
                        {tags!.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                </div>
                <Image src={img || ""} alt={name || ""} width={50} height={50} />
            </CardContent>
        </Card>
    );

};

export default UserCard;
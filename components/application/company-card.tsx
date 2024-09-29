import Image from "next/image";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface CompanyCardProps {
    name?: string;
    img?: string;
    description?: string;
    tags?: string[];
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, img, description, tags }) => {
    return (
        <Card className="p-5">
            <CardContent className="flex flex-row justify-between gap-2">
                <div className="flex flex-col gap-5">
                    <CardTitle className="text-3xl">{name}</CardTitle>
                    <div className="flex flex-row gap-2 text-wrap max-w-[80%]">
                        <p>{description}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        {tags!.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                </div>
                <Image src={img || ""} alt={name || ""} width={200} height={100} />
            </CardContent>
        </Card>
    );

};

export default CompanyCard;
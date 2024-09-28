import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CompanyCardProps {
    name: string;
    img: string;
    description: string;
    tags: string[];
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, img, description, tags }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <Image src={img} alt={name} width={300} height={200} />
                <div></div>
                <p>{description}</p>
                {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                ))}
            </CardContent>
        </Card>
    );

};

export default CompanyCard;
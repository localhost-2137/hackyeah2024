import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface UserCardProps {
  name?: string;
  img?: string;
  description?: string;
  tags?: string[];
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  img,
  description,
  tags,
}) => {
  return (
    <Card className="pt-6 w-[40%] hover:shadow-none transition-all hover:translate-y-1 hover:text-red-700 cursor-pointer duration-300">
      <CardContent className="flex justify-between items-center gap-4">
        <img
          src={img || ""}
          alt={name || ""}
          className="rounded-full aspect-square w-24 h-24"
        />
        <div className="flex flex-col gap-2">
          <CardTitle className="text-xl line-clamp-1">{name}</CardTitle>
          <div className="flex flex-row gap-2">
            {tags!.slice(0, 3).map((tag) => (
              <Badge className="hover:bg-red-700" key={tag}>
                {tag}
              </Badge>
            ))}
            {tags!.length > 3 && `+${tags!.length - 3} more`}
          </div>
          <p className="text-md line-clamp-2 text-black">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;

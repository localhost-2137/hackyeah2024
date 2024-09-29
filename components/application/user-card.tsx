import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import * as motion from "framer-motion/client";

interface UserCardProps {
  name?: string;
  img?: string;
  description?: string;
  tags?: string[];
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  img,
  description,
  tags,
  index,
}) => {
  return (
    <motion.div
      initial={{ translateY: 10, opacity: 0 }}
      animate={{
        translateY: 0,
        opacity: 1,
        transition: {
          delay: index * 0.2,
          duration: 0.5,
        },
      }}
      className="w-full !h-full"
    >
      <Card className="pt-6 hover:shadow-none transition-all hover:translate-y-1 hover:text-red-700 cursor-pointer duration-300 h-full">
        <CardContent className="flex justify-between items-center gap-4">
          <img
            src={img ?? "https://placehold.co/100x100"}
            alt={name ?? ""}
            className="rounded-full aspect-square w-24 h-24"
          />
          <div className="flex flex-col gap-2">
            <CardTitle className="text-xl line-clamp-1">{name}</CardTitle>
            <div className="flex flex-row flex-wrap gap-2">
              {tags!.slice(0, 3).map((tag) => (
                <Badge className="hover:bg-red-800 bg-red-700 line-clamp-1" key={tag}>
                  {tag}
                </Badge>
              ))}
              {tags!.length > 3 && `+${tags!.length - 3} more`}
            </div>
            <p className="text-md line-clamp-2 text-black">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserCard;

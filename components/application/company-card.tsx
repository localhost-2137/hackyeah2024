import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import * as motion from "framer-motion/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";

interface CompanyCardProps {
  name?: string;
  img?: string;
  description?: string;
  tags?: string[];
  index: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
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
      className="h-full"
    >
      <Card className="pt-6 hover:shadow-none transition-all hover:translate-y-1 hover:text-red-700 cursor-pointer duration-300 h-full">
        <CardContent className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={img || ""}
              className="rounded-full w-40 aspect-square"
            />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <CardTitle className="text-xl line-clamp-1">{name}</CardTitle>
            <div className="flex flex-row flex-wrap gap-2">
              {tags!.slice(0, 4).map((tag) => (
                <Badge className="hover:bg-red-800 bg-red-700 line-clamp-1" key={tag}>
                  {tag}
                </Badge>
              ))}
              {tags!.length > 4 && `+${tags!.length - 4} more`}
            </div>
            <p className="text-md line-clamp-4 text-black">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompanyCard;

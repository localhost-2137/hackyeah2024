import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import * as motion from "framer-motion/client";

interface CompanyCardProps {
    name?: string;
    img?: string;
    description?: string;
    tags?: string[];
    index: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, img, description, tags, index }) => {
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
        className="w-full md:w-[120vh]"
      >
        <Card className="pt-6 hover:shadow-none transition-all hover:translate-y-1 hover:text-red-700 cursor-pointer duration-300">
          <CardContent className="flex items-center gap-4">
            <img
              src={img || ""}
              alt={name || ""}
              className="rounded-full aspect-square w-24 h-24"
            />
            <div className="flex flex-col gap-2">
              <CardTitle className="text-xl line-clamp-1">{name}</CardTitle>
              <div className="flex flex-row gap-2">
                {tags!.slice(0, 4).map((tag) => (
                  <Badge className="hover:bg-red-700" key={tag}>
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
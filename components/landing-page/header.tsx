import { Button } from "@/components/ui/button";
import Link from "next/link";

import * as motion from "framer-motion/client"

export const LandingHeader = () => {
    return (
        <div className="flex w-full justify-center md:justify-end items-center mt-8 md:pr-32">
            <motion.span
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    duration: 0.8,
                    delay: 0,
                }}
            >
                <Link href={"/application"}>
                    <Button
                        className="bg-red-700 rounded-xl p-5 text-xl font-medium text-white uppercase hover:bg-red-800">
                        Zacznij pomagać
                    </Button>
                </Link>
            </motion.span>
        </div>
)
}

import * as motion from "framer-motion/client"

export const AnimateText = ({ children }: { children: string }) => {
    const formattedText = children.split(" ");

    return (
        <>
            {formattedText.map((el: string, i: number) => (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: i / 10,
                        }}
                        key={'animate-'+i}
                    >
                        {el}{" "}
                    </motion.span>
            ))}
        </>
    )
}

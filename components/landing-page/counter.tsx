export const LandingCounter = ({ count, title }: { count: number, title: string}) => {
    return (
        <div className="flex flex-col w-32 text-wrap">
            <p className="text-3xl font-bold text-red-700">+{count}</p>
            <p className="uppercase">{title}</p>
        </div>
    )
};

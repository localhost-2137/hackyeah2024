import Header from "@/components/layout/header";

const AppLayout = ({
                       children,
                   }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default AppLayout;

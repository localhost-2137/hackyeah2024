"use client";

<<<<<<< HEAD
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
=======
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
<<<<<<< HEAD
};
=======
  showHeader?: boolean;
}
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
<<<<<<< HEAD
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
=======
  showSocial,
  showHeader = false,
}: CardWrapperProps) => {
  return (
    <Card className="w-3/4 h-2/3 shadow-md">
      {showHeader && (
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
<<<<<<< HEAD
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
=======
      {/* <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter> */}
    </Card>
  );
};
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3

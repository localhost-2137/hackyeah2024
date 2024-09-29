"use client"

import animationData from '@/public/ai-generating.json';

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import partnershipCompatibility from "@/actions/compatibility";
import {useEffect, useState} from "react";
import {LottieAnimation} from "@/components/lottie-animation";
import Link from "next/link";

export const CompabilityDialog = ({potentialPartnerId}: { potentialPartnerId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<{ rating: number, description: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setData(null);
            return;
        }

        (async () => {
            setIsLoading(true);
            const {data} = await partnershipCompatibility(potentialPartnerId);
            setData(data ?? null);
            setIsLoading(false);
        })()
    }, [isOpen, potentialPartnerId]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-red-700 hover:bg-red-800">Sprawdź kompatybilności</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:max-w-screen-lg">
                <DialogHeader>
                    <DialogTitle>Sprawdzanie kompatybilności</DialogTitle>
                    <DialogDescription>
                        Sprawdź w jakim stopniu dana organizacja jest kompatybilna z Twoją
                    </DialogDescription>
                </DialogHeader>
                {isLoading ? (
                    <div className="flex items-center space-x-2">
                        <LottieAnimation animationData={animationData} loop={true} autoplay={true} size={4} />
                        <p>Oczekiwanie na odpowiedź sztucznej inteligencji...</p>
                    </div>
                    ) : (
                    <>
                        <p className="text-justify">
                            {data?.description}
                        </p>
                        <DialogFooter>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col space-y-1">
                                    <p className="font-lg">Ocena kompatybilności: <span
                                        className="font-semibold text-xl">{data?.rating} %</span></p>
                                    <p className="text-sm font-light">Szacowana ocena AI nie zawsze musi byc wiarygodna</p>
                                </div>
                                <Button className="bg-red-700 hover:bg-red-800" type="submit">
                                    <Link href={`/chat/${potentialPartnerId}`}>Przejdź do czatu</Link>
                                </Button>
                            </div>
                        </DialogFooter>
                    </>
                )}

                    </DialogContent>
                    </Dialog>
                    )
                }

import React, {Suspense} from "react";
import {FaRobot} from "react-icons/fa";

export default function AiSuspense({children}: { children: React.ReactNode }) {

    const Loading = (
        <div className="flex flex-col gap-4 items-center">
            <FaRobot color="text-gray-300" size="64"/>
            <p>Processing Data by Ai ...</p>
        </div>
    )

    return (
        <Suspense fallback={Loading}>
            {children}
        </Suspense>
    )
}

"use client"

import Lottie from "lottie-react";

export const LottieAnimation = ({ animationData, loop = true, autoplay = true, size }: { animationData: object, loop: boolean, autoplay: boolean, size: number }) => {
    return (
        <Lottie
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            style={{ width: size + "rem", height: size + "rem" }}
        />
    )
}

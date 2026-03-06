"use client";
import React, { useEffect, useState } from "react";

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const totalScrollableHeight = scrollHeight - clientHeight;
            const currentProgress = (scrollY / totalScrollableHeight) * 100;
            setProgress(currentProgress);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#0096D6] to-[#10b981] z-[200] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
        />
    );
}

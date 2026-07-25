"use client";
import { useEffect } from "react";

export default function ContentProtection() {
    useEffect(() => {
        const blockMenu = (e: MouseEvent) => e.preventDefault();

        const blockKeys = (e: KeyboardEvent) => {
            // F12
            if (e.keyCode === 123) { e.preventDefault(); return false; }
            // Ctrl+Shift+I  (Inspect)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) { e.preventDefault(); return false; }
            // Ctrl+Shift+J  (Console)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 74) { e.preventDefault(); return false; }
            // Ctrl+Shift+C  (Elements picker)
            if (e.ctrlKey && e.shiftKey && e.keyCode === 67) { e.preventDefault(); return false; }
            // Ctrl+U  (View Source)
            if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; }
            // Ctrl+S  (Save page)
            if (e.ctrlKey && e.keyCode === 83) { e.preventDefault(); return false; }
            // Ctrl+A  (Select all)
            if (e.ctrlKey && e.keyCode === 65) { e.preventDefault(); return false; }
        };

        document.addEventListener("contextmenu", blockMenu);
        document.addEventListener("keydown", blockKeys);

        return () => {
            document.removeEventListener("contextmenu", blockMenu);
            document.removeEventListener("keydown", blockKeys);
        };
    }, []);

    return null;
}

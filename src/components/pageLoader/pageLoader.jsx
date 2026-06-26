import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/lottie/Loading animation blue.json";

const MIN_LOADING_TIME = 2000; // 2 seconds

export default function PageLoader() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const startTimeRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Start loading on route change
        startTimeRef.current = Date.now();
        setLoading(true);

        timeoutRef.current = setTimeout(() => {
            setLoading(false);
        }, MIN_LOADING_TIME);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [location.pathname]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-md dark:bg-gray-900/70">
            <div className="w-48">
                <Lottie animationData={loadingAnimation} loop />
            </div>
        </div>
    );
}

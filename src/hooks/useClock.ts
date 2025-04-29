import { useEffect, useState } from "react";

export default function useClock() {
    const [hour, setHour] = useState(-1);
    const [minute, setMinute] = useState(-1);
    const [second, setSecond] = useState(-1);
        
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setHour(date.getHours());
            setMinute(date.getMinutes());
            setSecond(date.getSeconds());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return { hour, minute, second };
}
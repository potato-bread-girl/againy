import { useCallback, useState, useEffect } from "react";

export default function useAlarm() {
    const [alarmMap, setAlarmMap] = useState<{ [key: string]: string }>(() => {
        try {
            const saved = localStorage.getItem('alarmMap');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            console.error('Failed to parse alarms from localStorage', e);
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem('alarmMap', JSON.stringify(alarmMap));
    }, [alarmMap]);

    const putAlarm = useCallback((key: string, value: string) => {
        setAlarmMap((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const removeAlarm = useCallback((key: string) => {
        setAlarmMap((prev) => {
            const newMap = { ...prev };
            delete newMap[key];
            return newMap;
        });
    }, []);

    const playAlarm = useCallback((hour: number, minute: number, second: number) => {
        // console.log(hour, minute, second);
        // console.log(alarmMap);
        if (second !== 0) return;
        const key = `${hour}:${minute}`;
        console.log(key);
        if (!alarmMap[key]) return;
        let file;
        switch (alarmMap[key]) {
            case "START":
                file = "./sound/intro.mp3";
                break;
            case "END":
                file = "./sound/outro.mp3";
                break;
            case "LUNCH":
                file = "./sound/lunch.mp3";
                break;
            default:
                throw new Error("알 수 없는 알람입니다.");
        }
        const audio = new Audio(file);
        audio.play();
    }, [alarmMap]);

    return { alarmMap, putAlarm, removeAlarm, playAlarm };
}
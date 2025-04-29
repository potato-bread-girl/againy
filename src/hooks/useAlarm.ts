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
        if (second !== 0) return; // 분 단위 변경 시에만 확인
        const key = `${hour}:${minute}`;
        console.log(`Checking alarm for: ${key}`); // 확인 시간 로그

        const alarmType = alarmMap[key];
        if (!alarmType) return; // 해당 시간에 설정된 알람 없음

        console.log(`Alarm found: ${key} - Type: ${alarmType}`); // 찾은 알람 로그

        let soundFile;
        switch (alarmType) {
            case "START":
            soundFile = "/sound/intro.mp3";
            break;
            case "END":
            soundFile = "/sound/outro.mp3";
            break;
            case "LUNCH":
            soundFile = "/sound/lunch.mp3";
            break;
            default:
            // 알 수 없는 알람 타입 처리: 에러 로그 기록 후 종료
            console.error(`Unknown alarm type: ${alarmType}`);
            return;
        }

        console.log(`Attempting to play sound: ${soundFile}`); // 사운드 파일 경로 로그

        const audio = new Audio(soundFile);

        // 오디오 재생 시도
        audio.play().catch(error => {
            // 자동 재생 제한을 포함한 오류 처리
            console.error("Failed to play alarm sound:", error);
            // 자동 재생이 차단된 경우 사용자에게 알림 (콘솔 경고)
            if (error.name === 'NotAllowedError') {
            console.warn("Audio playback was blocked by the browser. User interaction might be required to enable audio.");
            // 필요시 UI를 통해 사용자에게 직접 알림
            // alert("브라우저 정책에 의해 알람 소리가 자동으로 재생되지 않았습니다. 페이지와 상호작용(클릭 등) 후에는 정상적으로 재생될 수 있습니다.");
            }
        });
    }, [alarmMap]);

    return { alarmMap, putAlarm, removeAlarm, playAlarm };
}
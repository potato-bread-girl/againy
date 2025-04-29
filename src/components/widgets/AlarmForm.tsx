import { useState } from "react";
import { AlarmType } from "../../constants/AlarmType";
import { formatNumber } from "../../utils/formatNumber";
import { Row } from "../layouts/Row";
import { Select } from "../forms/Select";
import { Hours } from "../forms/Hours";
import { Column } from "../layouts/Column";
import { Minutes } from "../forms/Minutes";

interface AlarmFormProps {
    putAlarm: (key: string, value: string) => void;
}

export function AlarmForm(
    { putAlarm }: AlarmFormProps
) {
    const now = new Date();
    const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);
    const [newAlarmHour, setNewAlarmHour] = useState(fiveMinutesLater.getHours());
    const [newAlarmMinute, setNewAlarmMinute] = useState(fiveMinutesLater.getMinutes());
    const options = Object.keys(AlarmType).map((key) => ({
        value: key,
        label: AlarmType[key as keyof typeof AlarmType],
    }));
    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const key = `${formatNumber(newAlarmHour)}:${formatNumber(newAlarmMinute)}`;
        const value = selectedOption;
        putAlarm(key, value);
    }
    return <form onSubmit={formHandler}>
        <Row gap={8}>
            <Select options={options} onChange={setSelectedOption} />
            <Hours hour={newAlarmHour} onChange={setNewAlarmHour} />
            <Column>:</Column>
            <Minutes
                minute={newAlarmMinute}
                onChange={setNewAlarmMinute} />
            <button type="submit">추가</button>
        </Row>
    </form>
}
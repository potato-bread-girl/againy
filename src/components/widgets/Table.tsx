import { AlarmType } from "../../constants/AlarmType";
import { Column } from "../layouts/Column";
import { Row } from "../layouts/Row";
import styles from "../../styles/table.module.css";

interface TableProps {
    alarmMap: { [key: string]: string };
    removeAlarm: (key: string) => void;
}
export function Table({
    alarmMap,
    removeAlarm,
}: TableProps) {
    return <Column gap={16}>
        {Object.entries(alarmMap).sort().map(([key, value]) => (            
            <Row key={key} gap={32}>
                <Column width={150}>
                    <section className={styles.alarmType}>
                    {AlarmType[value as keyof typeof AlarmType]}
                    </section>
                </Column>
                <Column width={120}>{key}</Column>
                <button onClick={() => removeAlarm(key)}>삭제</button>
            </Row>
        ))}
    </Column>
}
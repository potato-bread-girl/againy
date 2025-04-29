import { formatNumber } from "../../utils/formatNumber";
import styles from "../../styles/clock.module.css";
import { Column } from "../layouts/Column";
import { Row } from "../layouts/Row";

interface ClockProps {
    hour: number;
    minute: number;
    second: number;
}

export function Clock(
    { hour, minute, second }: ClockProps
) {
    
    return <section className={styles.clock}>
        <Row gap={1}>
            <Column>{formatNumber(hour)}</Column>
            <Column>:</Column>
            <Column>{formatNumber(minute)}</Column>
            <Column>:</Column>
            <Column>{formatNumber(second)}</Column>
        </Row>
    </section>
}
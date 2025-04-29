import { Column } from "./components/layouts/Column"
import { Container } from "./components/layouts/Container";
import { Clock } from "./components/widgets/Clock";
import { Table } from "./components/widgets/Table";
import useAlarm from "./hooks/useAlarm";
import { AlarmForm } from "./components/widgets/AlarmForm";
import useClock from "./hooks/useClock";
import { useEffect } from "react";

function App() {
  const { alarmMap, putAlarm, removeAlarm, playAlarm } = useAlarm();
  const { hour, minute, second } = useClock();
  useEffect(() => {
    playAlarm(hour, minute, second)
  }, [hour, minute, second]);

  return (
    <Container>
      <Column gap={32}>
        <Clock hour={hour} minute={minute} second={second} />
        <Table alarmMap={alarmMap} removeAlarm={removeAlarm} />
        <AlarmForm putAlarm={putAlarm} />
      </Column>
    </Container>
  )
}

export default App
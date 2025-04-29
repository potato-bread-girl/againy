interface MinutesProps {
    minute: number;
    onChange: (value: number) => void;
}
export function Minutes({ minute, onChange}: MinutesProps) {
    return <input type="number" min={0} max={59} step={1} value={minute} onChange={(event) => onChange(Number(event.target.value))} />
}
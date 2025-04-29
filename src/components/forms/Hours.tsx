export function Hours({ hour, onChange }: { hour: number, onChange: (value: number) => void }) {
    return <input type="number" min={0} max={23} value={hour} onChange={(event) => onChange(Number(event.target.value))} />
}
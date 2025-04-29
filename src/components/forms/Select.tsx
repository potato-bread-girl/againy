interface SelectProps {
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
}
export function Select({ options, onChange }: SelectProps) {
    return (
        <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
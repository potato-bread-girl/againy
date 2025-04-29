interface ColumnProps {
    children: React.ReactNode;
    gap?: number;
    width?: number;
}

export function Column({ children, gap, width }: ColumnProps) {
    return (
        <section
            style={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            gap,
            width }}>
            {children}
        </section>
    )
}
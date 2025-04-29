interface RowProps {
    children: React.ReactNode;
    gap?: number;
}

export function Row({ children, gap }: RowProps) {
    return (
        <section
            style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center',
            gap,
            }}>
            {children}
        </section>
    )
}
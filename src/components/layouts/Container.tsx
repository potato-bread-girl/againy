interface ContainerProps {
    children: React.ReactNode;
}
export function Container({ children }: ContainerProps) {
    return (
        <section style={{ maxWidth: 576, margin: '0 auto', padding: '1rem' }}>
            {children}
        </section>
    );
}
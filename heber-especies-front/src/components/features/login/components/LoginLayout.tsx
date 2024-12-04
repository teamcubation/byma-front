
// components/LoginLayout.tsx
interface LoginLayoutProps {
    children: React.ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => (
    <section className="w-full min-h-screen bg-[#152D5C]">
        <div className="h-full px-6 bg-contain bg-center bg-no-repeat bg-fondo-login grid grid-cols-12 gap-6">
            {children}
        </div>
    </section>
);

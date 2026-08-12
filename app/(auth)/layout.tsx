
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex justify-center items-center bg-linear-to-l from-indigo-950 via-blue-950 to-blue-900">
            {children}
        </div>
    )
}
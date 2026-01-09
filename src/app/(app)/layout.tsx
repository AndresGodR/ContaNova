export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar y header del sistema irán aquí */}
      {children}
    </div>
  );
}
    
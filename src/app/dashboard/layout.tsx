export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col md:container">
      {children}
    </div>
  );
}

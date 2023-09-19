export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container relative flex min-h-screen flex-col">
      {children}
    </div>
  );
}

'use client';

export default function Error({ error }: { readonly error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Page not found</p>
    </div>
  );
}

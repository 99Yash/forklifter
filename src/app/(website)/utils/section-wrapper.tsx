export default function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mb-10 max-w-[90%] md:max-w-[80%] lg:max-w-[70%] flex flex-col justify-center min-h-[50vh]">
      {children}
    </section>
  );
}

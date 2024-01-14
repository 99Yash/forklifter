type SectionTitleProps = {
  title: string;
  number: number;
  showNumber: boolean;
};

export default function SectionTitle({
  title,
  number,
  showNumber,
}: SectionTitleProps) {
  return (
    <h1 className="text-gray-300 font-semibold sm:text-2xl md:text-3xl lg:text-4xl mx-0 md:my-2 lg:my-3 xl:my-4 after:inline-block after:relative after:-top-[.7rem] after:w-[30%] after:h-px after:ml-4 ">
      <span
        className={`sm:text-2xl md:text-3xl text-[#bd66fffc] font-mono mr-1 ${
          showNumber ? 'inline' : 'none'
        }`}
      >
        0{number}.
      </span>
      {title}
    </h1>
  );
}

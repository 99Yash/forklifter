type SectionTitleProps = {
  title: string;
  showNumber: boolean;
};

export default function SectionTitle({ title, showNumber }: SectionTitleProps) {
  return (
    <h1 className="text-gray-300 font-semibold flex items-center text-3xl lg:text-4xl mx-0 md:my-2 lg:my-3 xl:my-4 after:inline-block after:relative after:-top-[.7rem] after:w-[30%] after:h-px after:ml-4 ">
      <span
        className={`sm:text-2xl md:text-3xl text-[#bd66fffc] font-mono mr-1 ${
          showNumber ? 'inline' : 'none'
        }`}
      >
        ❖
      </span>
      {title}
    </h1>
  );
}

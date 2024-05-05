import Link from 'next/link';
import * as Icons from '@/components/ui/icons';

type Props = {
  github: string | null;
  linkedIn: string | null;
  twitter: string | null;
};

export default function SocialLinks({ github, linkedIn, twitter }: Props) {
  return (
    <div className="lg:fixed bottom-10 lg:bottom-0 w-full lg:w-auto flex lg:block">
      <ul className="w-full ml-0 lg:ml-12 flex lg:block justify-center list-none">
        <li className="my-10 mx-10 lg:mx-0">
          {github && (
            <Link
              className="flex items-center text-[#bd66fffc] hover:transition-none hover:-translate-y-2 duration-200"
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.GitHub className="w-5 h-5 hover:transition-none cursor-pointer" />
            </Link>
          )}
        </li>
        {linkedIn && (
          <li className="my-10 mx-10 lg:mx-0">
            <Link
              className="flex items-center text-[#bd66fffc] hover:transition-none hover:-translate-y-2 duration-200"
              href={linkedIn}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.LinkedIn className="w-5 h-5 hover:transition-none cursor-pointer" />
            </Link>
          </li>
        )}
        {twitter && (
          <li className="my-10 mx-10 lg:mx-0">
            <Link
              className="flex items-center text-[#bd66fffc] hover:transition-none hover:-translate-y-2 duration-200"
              href={twitter}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.Twitter className="w-5 h-5 hover:transition-none cursor-pointer" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

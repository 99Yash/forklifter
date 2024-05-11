import { siteConfig } from '@/config/site';
import { prisma } from '@/lib/db';
import { getInitials } from '@/lib/utils';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username') ?? 'ygkr';

  const interMedium = await fetch(
    new URL('@/styles/Inter-Medium.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const interBold = await fetch(
    new URL('@/styles/inter-bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const interSemibold = await fetch(
    new URL('@/styles/inter-semibold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  if (!username) {
    return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      name: true,
      oneLiner: true,
    },
  });

  if (!user)
    return new ImageResponse(
      (
        <div tw="relative flex flex-col items-center justify-center p-16 bg-[#000000] text-[#ccc] w-full h-full">
          <h1
            style={{ fontFamily: 'Inter Bold' }}
            tw="text-6xl tracking-tighter"
          >
            User not found
          </h1>
          <p tw="absolute bottom-2 self-center text-xs">{siteConfig.name}</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter Medium',
            data: interMedium,
            style: 'normal',
          },
        ],
      }
    );

  return new ImageResponse(
    (
      <div tw="relative flex flex-col justify-center p-16 bg-[#000000] text-[#ccc] w-full h-full">
        <h1
          style={{ fontFamily: 'Inter Bold' }}
          tw="absolute left-16 top-0 text-8xl tracking-tighter"
        >
          {getInitials(user.name)}
        </h1>
        <h1 style={{ fontFamily: 'Inter Bold' }} tw="text-3xl tracking-tight">
          {user.name}
        </h1>
        <p
          style={{
            fontFamily: 'Inter Semibold',
          }}
        >
          {user.oneLiner}
        </p>
        <p tw="absolute bottom-2 self-center text-xs">{siteConfig.name}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter Medium',
          data: interMedium,
          style: 'normal',
        },
        {
          name: 'Inter Bold',
          data: interBold,
          style: 'normal',
        },
        {
          name: 'Inter Semibold',
          data: interSemibold,
          style: 'normal',
        },
      ],
    }
  );
}

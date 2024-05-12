import WelcomeEmail from '@/components/emails/welcome';
import { resend } from '@/lib/resend';
import { z } from 'zod';

export async function POST(req: Request) {
  const input = z
    .object({
      name: z.string(),
      email: z.string().email({
        message: 'Please enter a valid email address.',
      }),
      subject: z.string().optional(),
    })
    .parse(await req.json());

  try {
    await resend.emails.send({
      from: 'Yash <onboarding@resend.dev>',
      to: input.email,
      subject: 'Welcome to Forklifter!',
      react: WelcomeEmail({ name: input.name }),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
  return new Response(null, { status: 200 });
}

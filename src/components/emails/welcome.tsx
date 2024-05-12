import { siteConfig } from '@/config/site';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const webImages = [
  {
    src: '../../../public/ygkr-1.png',
    alt: `${siteConfig.name} Hero section`,
    description: `Your page will be publicly available to everyone on the internet`,
  },
  {
    src: '../../../public/ygkr-about.png',
    alt: `${siteConfig.name} About + Experience section`,
    description: `Final website is fully responsive on all kinds of devices`,
  },
  {
    src: '../../../public/ygkr-testimonials.png',
    alt: `${siteConfig.name} Testimonials section`,
    description: `You can add testimonials from your clients or colleagues`,
  },
];

export default function WelcomeEmail({ name = 'there' }: { name?: string }) {
  return (
    <Html>
      <Head>
        <title>
          {name !== 'there'
            ? `Welcome to ${siteConfig.name}, ${name}!`
            : `Welcome to ${siteConfig.name}!`}
        </title>
      </Head>
      <Preview>Hi {name}, nice to see you here.</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-zinc-950">
                {siteConfig.name}
              </Heading>
              <Hr className="my-4" />
              <Heading className="text-center text-3xl font-semibold text-zinc-800">
                Welcome to {siteConfig.name}.
              </Heading>
              <Text className="mb-0 mt-6 text-center text-base">
                I{`'`}m glad you came through this little corner of the
                internet. {siteConfig.name} allows you to create a fantastic
                portfolio to showcase your recruiters.
              </Text>
            </Section>
            <Section className="mt-6">
              {webImages.map((item) => (
                <Row key={item.alt} className="mt-10">
                  <Img
                    src={item.src}
                    alt={item.alt}
                    height={424}
                    className="aspect-video w-full object-cover"
                  />
                  <Text className="mb-0 mt-4 text-center text-base">
                    {item.description}
                  </Text>
                </Row>
              ))}
            </Section>
            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                If you have any questions or need help, feel free to reach out
                to me at yashgouravkar@gmail.com.
              </Text>
              <Text className="my-4">
                Thanks for being a part of {siteConfig.name}.
              </Text>
              <Text className="my-4">
                Yash Gourav Kar, @ {siteConfig.name} {new Date().getFullYear()}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

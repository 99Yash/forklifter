import { Card } from "@/components/ui/card";

export const metadata = {
  title: {
    default: "Pricing",
  },
};
export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">Pricing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing details
        </p>
      </header>
      <main className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Billing info</h1>
        <Card className="flex flex-col gap-2 rounded-md p-4 ">
          <b>FREE</b>
          <p className="text-muted-foreground">
            You are currently on the <strong>Free</strong> plan. Upgrade to get
            a custom domain to your name.
          </p>
        </Card>
      </main>
    </div>
  );
}

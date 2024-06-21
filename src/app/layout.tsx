import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/common/Header";
import { Toaster } from "~/components/ui/sonner";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Smart Donna AI",
  description:
    "Automatically record, transcribe, and get actionable insights from your meetings.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.user.getUser();

  const createdAt = user?.createdAt;

  const createdAtDate = createdAt ? new Date(createdAt) : null;

  const userPlans = await api.userPlan.getPlanByUser();

  const isTrialClaimed = userPlans.some((plan) => plan.planId === "5");

  // if (isTrialClaimed) {
    await api.userPlan.create({
      planId: "5",
      transactionId: "",
      startDate: new Date(),
      endDate: new Date(createdAtDate!.getTime() + 15 * 24 * 60 * 60 * 1000),
    });
  // }

  console.log("Trial claimed");

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="min-h-screen bg-bg">
            <div className="mx-auto w-full max-w-[1440px]">
              <Header />
              {children}
              <Toaster />
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/common/Header";
import { Toaster } from "~/components/ui/sonner";
import { DashboardProvider } from "~/Context/DashboardContext";

export const metadata = {
  title: "Smart KSHAMA AI",
  description:
    "Automatically record, transcribe, and get actionable insights from your meetings.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <DashboardProvider>
            <div className="min-h-screen bg-bg">
              <div className="mx-auto w-full max-w-[1440px]">
                <Header />
                {children}
                <Toaster />
              </div>
            </div>
          </DashboardProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

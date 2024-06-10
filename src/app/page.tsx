import { Pencil } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ConnectCalender from "~/components/dashboard/ConnectCalender";
import JoinMeeting from "~/components/dashboard/JoinMeeting";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const name = session?.user.name;

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col justify-start gap-2">
        <div className="bold flex flex-col text-3xl md:flex-row">
          <span>Welcome,</span> &nbsp; <span>{name}</span>
        </div>
        <Link
          href="/manage-profile"
          className="flex w-fit items-center gap-2 p-0 font-bold underline underline-offset-2"
        >
          <Pencil size={15} /> Manage Profile
        </Link>
      </div>
      <ConnectCalender />
      <JoinMeeting />
    </div>
  );
}

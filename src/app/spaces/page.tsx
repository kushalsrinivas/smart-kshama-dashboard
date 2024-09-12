import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import ProcessTwitterSpace from "~/components/dashboard/ProcessTwitterSpace";

export default async function SpacesPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const name = session?.user.name;
  const currentUserId = session?.user.id;
  // const currentUserId = "d879558f-6852-4f06-970d-68db9c6dfd1f";


  return (
    <div className="flex flex-col gap-8 p-4">
      <ProcessTwitterSpace currentUserId={currentUserId} />
    </div>
  );
}
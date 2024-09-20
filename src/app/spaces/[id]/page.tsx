import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import SpaceDetail from "~/components/dashboard/SpaceDetail";

export default async function SpacesPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const { id } = params;

  return (
    <div className="flex flex-col gap-8 p-4">
      <SpaceDetail spaceId={id} />
    </div>
  );
}

import NotificationDetail from "@/notification page/NotificationDetail";

export default async function NotificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NotificationDetail id={id} />;
}

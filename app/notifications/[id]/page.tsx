import NotificationDetail from '../../../notification page/NotificationDetail';

export default async function NotificationDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  return <NotificationDetail id={resolvedParams.id} />;
}

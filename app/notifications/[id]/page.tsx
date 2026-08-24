import NotificationDetail from '../../../notification page/NotificationDetail';

export default function NotificationDetailPage({ params }: { params: { id: string } }) {
  return <NotificationDetail id={params.id} />;
}

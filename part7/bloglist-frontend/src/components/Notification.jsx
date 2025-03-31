import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const className = notification.type === 'error' ? 'error' : 'normal';

  return <div className={className}>{notification.message}</div>;
};

export default Notification;

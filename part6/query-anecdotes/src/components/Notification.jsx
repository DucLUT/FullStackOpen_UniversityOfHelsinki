import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const [notification] = useNotification();

  if (!notification) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;

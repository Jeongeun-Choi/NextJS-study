import { createContext, PropsWithChildren, useCallback, useState } from "react";

type NotificationType = {
  title: string;
  message: string;
  status: string;
};
type NotificationContextType = {
  notification: NotificationType | null;
  showNotification: (notification: NotificationType) => void;
  hideNotification: () => void;
};

const initNotification = { title: "", message: "", status: "" };

const NotificationContext = createContext<NotificationContextType | null>({
  notification: initNotification,
  showNotification: () => {},
  hideNotification: () => {},
});

export function NotificationContextProvider({ children }: PropsWithChildren) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationType | null>(null);

  const handleShowNotification = (notificationData: NotificationType) => {
    setActiveNotification(notificationData);
  };

  const handleHideNotification = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: handleShowNotification,
    hideNotification: handleHideNotification,
  };
  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;

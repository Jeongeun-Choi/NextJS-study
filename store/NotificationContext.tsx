import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

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

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

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

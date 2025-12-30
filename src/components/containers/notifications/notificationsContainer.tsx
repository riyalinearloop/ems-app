import {
  NOTIFICATION_FILTERS,
  NOTIFICATION_ITEMS,
  NOTIFICATION_QUICK_LINKS,
  NOTIFICATION_SUMMARY,
} from "@/components/data/notifications";
import NotificationsScene from "./notificationsScene";

const NotificationsContainer = () => {
  return (
    <NotificationsScene
      notificationFilters={NOTIFICATION_FILTERS}
      notificationItems={NOTIFICATION_ITEMS}
      notificationQuickLinks={NOTIFICATION_QUICK_LINKS}
      notificationSummary={NOTIFICATION_SUMMARY}
    />
  );
};

export default NotificationsContainer;

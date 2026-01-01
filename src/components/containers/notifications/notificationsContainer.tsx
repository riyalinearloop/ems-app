"use client";
import { useState, useMemo } from "react";
import {
  NOTIFICATION_FILTERS,
  NOTIFICATION_ITEMS,
  NOTIFICATION_QUICK_LINKS,
  type NotificationFilterKey,
  type NotificationItem,
} from "@/components/data/notifications";
import NotificationsScene from "./notificationsScene";

const NotificationsContainer = () => {
  const [activeFilter, setActiveFilter] =
    useState<NotificationFilterKey>("all");
  const [notificationItems, setNotificationItems] =
    useState<NotificationItem[]>(NOTIFICATION_ITEMS);

  // Filter notifications based on active filter
  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return notificationItems;
    }

    return notificationItems.filter((item) => {
      switch (activeFilter) {
        case "unread":
          return item.unread;
        case "critical":
          return item.priority === "critical";
        case "highPriority":
          return item.priority === "high" || item.priority === "critical";
        default:
          return true;
      }
    });
  }, [notificationItems, activeFilter]);

  // Calculate summary from filtered items
  const notificationSummary = useMemo(() => {
    return {
      total: notificationItems.length,
      unread: notificationItems.filter((item) => item.unread).length,
      critical: notificationItems.filter((item) => item.priority === "critical")
        .length,
      highPriority: notificationItems.filter(
        (item) => item.priority === "high" || item.priority === "critical"
      ).length,
    };
  }, [notificationItems]);

  // Handler for filter change
  const handleFilterChange = (filterKey: NotificationFilterKey) => {
    setActiveFilter(filterKey);
    // TODO: When API is integrated, fetch filtered notifications here
  };

  // Handler for marking a notification as read
  const handleMarkAsRead = (itemId: string) => {
    setNotificationItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, unread: false } : item
      )
    );
    // TODO: When API is integrated, call API to mark as read
    // Example: await markNotificationAsRead(itemId);
  };

  // Handler for deleting a notification
  const handleDelete = (itemId: string) => {
    setNotificationItems((prev) => prev.filter((item) => item.id !== itemId));
    // TODO: When API is integrated, call API to delete notification
    // Example: await deleteNotification(itemId);
  };

  // Handler for marking all as read
  const handleMarkAllAsRead = () => {
    setNotificationItems((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
    // TODO: When API is integrated, call API to mark all as read
    // Example: await markAllNotificationsAsRead();
  };

  return (
    <NotificationsScene
      notificationFilters={NOTIFICATION_FILTERS}
      notificationItems={filteredNotifications}
      notificationQuickLinks={NOTIFICATION_QUICK_LINKS}
      notificationSummary={notificationSummary}
      activeFilter={activeFilter}
      onFilterChange={handleFilterChange}
      onMarkAsRead={handleMarkAsRead}
      onDelete={handleDelete}
      onMarkAllAsRead={handleMarkAllAsRead}
    />
  );
};

export default NotificationsContainer;

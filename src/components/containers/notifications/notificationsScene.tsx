import {
  type NotificationItem as NotificationItemType,
  type NotificationFilter,
  type NotificationFilterKey,
  type NotificationQuickLink,
  type NotificationSummary,
} from "../../data/notifications";
import {
  AlertTriangle,
  Bell,
  ChevronRight,
  Clock,
  Eye,
  Filter,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationsSceneProps {
  notificationFilters: NotificationFilter[];
  notificationItems: NotificationItemType[];
  notificationQuickLinks: NotificationQuickLink[];
  notificationSummary: NotificationSummary;
  activeFilter?: NotificationFilterKey;
  onFilterChange?: (filterKey: NotificationFilterKey) => void;
  onMarkAsRead?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
  onMarkAllAsRead?: () => void;
}

const NotificationsScene = (props: NotificationsSceneProps) => {
  const {
    notificationFilters,
    notificationItems,
    notificationQuickLinks,
    notificationSummary,
    activeFilter = "all",
    onFilterChange,
    onMarkAsRead,
    onDelete,
    onMarkAllAsRead,
  } = props;

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header + summary stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="truncate">Notifications Center</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Stay updated on critical system events and alerts
              </p>
            </div>
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 whitespace-nowrap"
            >
              <Eye className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Mark all as read</span>
              <span className="sm:hidden">Mark all read</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <SummaryCard label="Total" value={notificationSummary.total} />
            <SummaryCard
              label="Unread"
              value={notificationSummary.unread}
              valueClasses="text-blue-600"
              bgClasses="bg-blue-50"
            />
            <SummaryCard
              label="Critical"
              value={notificationSummary.critical}
              valueClasses="text-red-600"
              bgClasses="bg-red-50"
            />
            <SummaryCard
              label="High Priority"
              value={notificationSummary.highPriority}
              valueClasses="text-orange-600"
              bgClasses="bg-orange-50"
            />
          </div>
        </div>
      </div>

      {/* Filters + list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                Filter notifications:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {notificationFilters.map((filter) => {
                const isActive = filter.key === activeFilter;
                return (
                  <button
                    key={filter.key}
                    onClick={() => onFilterChange?.(filter.key)}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {notificationItems.map((item) => (
            <NotificationRow
              key={item.id}
              item={item}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {notificationQuickLinks.map((link) => (
          <Card
            key={link.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <CardContent>
              <h4 className="font-medium text-gray-900 mb-2">{link.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{link.description}</p>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 -ml-2"
              >
                {link.actionLabel}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface SummaryCardProps {
  label: string;
  value: number;
  valueClasses?: string;
  bgClasses?: string;
}

const SummaryCard = ({
  label,
  value,
  valueClasses,
  bgClasses,
}: SummaryCardProps) => {
  return (
    <div
      className={`text-center p-4 rounded-lg ${
        bgClasses ?? "bg-gray-50"
      }`.trim()}
    >
      <p
        className={`text-2xl font-bold ${
          valueClasses ?? "text-gray-900"
        }`.trim()}
      >
        {value}
      </p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

interface NotificationRowProps {
  item: NotificationItemType;
  onMarkAsRead?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
}

const NotificationRow = ({
  item,
  onMarkAsRead,
  onDelete,
}: NotificationRowProps) => {
  const isInventoryAlert =
    item.category === "inventory" || item.category === "incidents";
  const isCritical = item.priority === "critical";

  const showMarkAsRead = item.unread;
  const showDelete = true;

  const containerExtraClasses =
    item.unread && item.containerClasses
      ? item.containerClasses
      : item.containerClasses || "";

  // Determine icon based on priority and category
  const getIcon = () => {
    if (isInventoryAlert || isCritical) {
      return <AlertTriangle className="w-5 h-5" />;
    }
    return <Clock className="w-5 h-5" />;
  };

  // Determine title color based on read status
  const titleColorClass = item.unread ? "text-gray-900" : "text-gray-700";
  const descriptionColorClass = item.unread ? "text-gray-800" : "text-gray-600";

  return (
    <div
      className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors ${containerExtraClasses}`.trim()}
    >
      <div className="flex items-start space-x-2 sm:space-x-4">
        <div
          className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${item.iconBgClasses}`}
        >
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-1">
            <h4
              className={`text-xs sm:text-sm font-medium ${titleColorClass} truncate`}
            >
              {item.title}
            </h4>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span
                className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${item.badgeClasses} ${item.badgeTextClasses}`}
              >
                {item.priorityLabel}
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {item.timeAgo}
              </span>
            </div>
          </div>

          <p className={`text-xs sm:text-sm ${descriptionColorClass}`}>
            {item.description}
          </p>

          <div className="flex items-center space-x-2 sm:space-x-3 mt-2 sm:mt-3 flex-wrap">
            {showMarkAsRead && (
              <button
                onClick={() => onMarkAsRead?.(item.id)}
                className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 whitespace-nowrap"
              >
                <Eye className="w-3 h-3 flex-shrink-0" />
                <span>Mark as read</span>
              </button>
            )}
            {showDelete && (
              <button
                onClick={() => onDelete?.(item.id)}
                className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-700 whitespace-nowrap"
              >
                <Trash2 className="w-3 h-3 flex-shrink-0" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScene;

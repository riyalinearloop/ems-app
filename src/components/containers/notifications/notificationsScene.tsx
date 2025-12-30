import {
  type NotificationItem as NotificationItemType,
  type NotificationFilter,
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
  Trash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationsSceneProps {
  notificationFilters: NotificationFilter[];
  notificationItems: NotificationItemType[];
  notificationQuickLinks: NotificationQuickLink[];
  notificationSummary: NotificationSummary;
}

const NotificationsScene = (props: NotificationsSceneProps) => {
  const {
    notificationFilters,
    notificationItems,
    notificationQuickLinks,
    notificationSummary,
  } = props;

  return (
    <div className="space-y-6">
      {/* Header + summary stats */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                <Bell className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                Notifications Center
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-gray-600">
                Stay updated on critical system events and alerts
              </CardDescription>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center justify-center space-x-2 rounded-full border border-blue-100 bg-blue-50 text-xs md:text-sm font-medium text-blue-600 hover:bg-blue-100 hover:text-blue-700 whitespace-nowrap self-start md:self-auto"
            >
              <Eye className="w-4 h-4 shrink-0" />
              <span>Mark all as read</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </CardContent>
      </Card>

      {/* Filters + list */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400 shrink-0" />
              <span className="text-sm font-medium text-gray-700">
                Filter notifications:
              </span>
            </div>

            <div className="flex -mx-4 md:mx-0">
              <div className="flex flex-1 gap-2 px-4 md:px-0 overflow-x-auto md:overflow-visible">
                {notificationFilters.map((filter) => {
                  const isActive = filter.key === "all";
                  return (
                    <Button
                      key={filter.key}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className={`whitespace-nowrap ${filter.baseClasses} ${
                        isActive ? filter.activeClasses : ""
                      }`}
                    >
                      {filter.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {notificationItems.map((item) => (
              <NotificationRow key={item.id} item={item} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notificationQuickLinks.map((link) => (
          <Card
            key={link.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <CardContent className="p-6">
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
}

const NotificationRow = ({ item }: NotificationRowProps) => {
  const isInventoryAlert =
    item.category === "inventory" || item.category === "incidents";
  const isCritical = item.priority === "critical";

  const showMarkAsRead = item.unread;
  const showDelete = true;

  const containerExtraClasses =
    item.unread && item.containerClasses
      ? item.containerClasses
      : item.containerClasses || "";

  return (
    <div
      className={`p-6 hover:bg-gray-50 transition-colors ${containerExtraClasses}`.trim()}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${item.iconBgClasses}`}>
          {isInventoryAlert ? (
            <AlertTriangle className="w-5 h-5" />
          ) : isCritical ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <Clock className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-1">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {item.title}
            </h4>
            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.badgeClasses} ${item.badgeTextClasses}`}
              >
                {item.priorityLabel}
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {item.timeAgo}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-800 wrap-break-word">
            {item.description}
          </p>

          <div className="flex items-center space-x-3 mt-3">
            {showMarkAsRead && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-0 flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-3 h-3" />
                <span>Mark as read</span>
              </Button>
            )}
            {showDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-0 py-0 flex items-center space-x-1 text-xs text-red-600 hover:text-red-700"
              >
                <Trash className="w-3 h-3" />
                <span>Delete</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScene;

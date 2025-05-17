import { AlertTriangle, Bell, CheckCircle2 } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Badge } from "../ui/badge"

export function Notification() {
    const notifications = [
        { id: 1, type: 'success', text: 'You have a new message', read: false },
        { id: 2, type: 'warning', text: 'System update coming soon', read: true },
        { id: 3, type: 'info', text: 'Your weekly report is ready', read: true },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full p-2">
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => !n.read) && (
                        <Badge
                            variant="destructive"
                            className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-2"
                        >
                            {notifications.filter(n => !n.read).length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <div className="p-2">
                    <h3 className="text-sm font-semibold px-2">Bildirimler</h3>

                    {notifications.length === 0 ? (
                        <div className="flex items-center justify-center p-4 text-muted-foreground">
                            <span className="text-sm">Bildirim yok</span>
                        </div>
                    ) : (
                        <>
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className={`flex items-start gap-3 p-2 cursor-pointer ${!notification.read ? 'bg-accent' : ''
                                        }`}
                                >
                                    <div className="flex-shrink-0">
                                        {notification.type === 'success' ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        ) : notification.type === 'warning' ? (
                                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                        ) : (
                                            <Bell className="h-5 w-5 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">{notification.text}</p>
                                        <span className="text-xs text-muted-foreground">
                                            2 saat önce
                                        </span>
                                    </div>
                                    {!notification.read && (
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

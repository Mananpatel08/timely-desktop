import React from "react";
import { Timer } from "lucide-react";
import { cn } from "../ui/helper";

interface TimeBadgeProps {
    watchedHours?: number;
    watchedMinutes?: number;
    className?: string
}

const TimeBadge: React.FC<TimeBadgeProps> = ({ watchedHours = 0, watchedMinutes = 0, className }) => {
    const timeParts = [];
    if (watchedHours > 0) timeParts.push(`${watchedHours}h`);
    if (watchedMinutes > 0) timeParts.push(`${watchedMinutes}m`);

    if (timeParts.length === 0) timeParts.push("0h 0m");

    return (
        <div className={cn("inline-flex items-center space-x-2 rounded-full bg-custom-background-90 text-sm font-medium text-custom-text-200", className)}>
            <Timer className="w-3.5 h-3.5" />
            <span className="text-xs">{timeParts.join(" ")}</span>
        </div>
    );
};

export default TimeBadge;

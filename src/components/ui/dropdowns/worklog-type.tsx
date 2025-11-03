import { useState } from "react";
import { CodeXml, FlaskConical, Palette, FileCog, Briefcase, UserRound, CircleEllipsis, MessageSquareMore, Search, Shapes } from "lucide-react";

const TYPE_CHOICES = [
    { value: "development", label: "Development", icon: CodeXml, iconColor: "text-cyan-500" },
    { value: "testing", label: "Testing", icon: FlaskConical, iconColor: "text-teal-500" },
    { value: "design", label: "Design", icon: Palette, iconColor: "text-pink-500" },
    { value: "r&d", label: "R&D", icon: FileCog, iconColor: "text-blue-500" },
    { value: "client", label: "Client Meeting", icon: Briefcase, iconColor: "text-green-600" },
    { value: "internal", label: "Internal Meeting", icon: UserRound, iconColor: "text-yellow-500" },
    { value: "other", label: "Other", icon: CircleEllipsis, iconColor: "text-gray-500", hidden: true },
    { value: "meeting", label: "Meeting", icon: MessageSquareMore, iconColor: "text-gray-500", hidden: true },
];

export default function TypeDropdown() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<null | typeof TYPE_CHOICES[number]>(null);

    const filtered = TYPE_CHOICES.filter(item => !item.hidden && item.label.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <button
                className="border border-custom-border-200 rounded-md px-2 py-1 h-7 w-fit flex items-center gap-2 bg-white"
                onClick={() => setOpen(!open)}
            >
                {selected ? (
                    <selected.icon className={`h-4 w-4 ${selected.iconColor}`} />
                ) : (
                    <Shapes size={16} className="text-gray-500" />
                )}
                <span className="text-sm">{selected ? selected.label : "Select Type"}</span>
            </button>
            {open && (
                <div className="relative text-sm">
                    <div className="absolute mt-1 w-[210px] bg-white rounded-md shadow-lg border border-custom-border-200 z-50 p-2">
                        <div className="flex items-center border border-custom-border-200 rounded-md px-2 mb-2 bg-white">
                            <Search size={14} className="text-gray-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full px-2 py-1 outline-none text-sm"
                            />
                        </div>

                        <ul className="max-h-56 overflow-auto space-y-1">
                            {filtered.map(item => (
                                <li
                                    key={item.value}
                                    onClick={() => { setSelected(item); setOpen(false); }}
                                    className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded hover:bg-gray-50"
                                >
                                    <item.icon size={16} className={item.iconColor} />
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

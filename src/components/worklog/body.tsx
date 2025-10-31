import { formatDate, formatTime } from "@/helpers/date.helper";
import type { IWorklog } from "@/types/worklog";
import { Avatar } from "../avatar";
import { getFileURL } from "@/helpers/file.helper";

interface TimelyTableProps {
  records: IWorklog[];
  onToggleTimer?: (id: string | number) => void;
  onResetTimer?: (id: string | number) => void;
}

export default function WorklogTable({ records, onToggleTimer, onResetTimer }: TimelyTableProps) {

  const columns = [
    { name: "DATE", key: "created_at", render: (r: IWorklog) => formatDate(r.created_at) },
    { name: "PROJECT", key: "project_name", render: (r: IWorklog) => r.project_name || "-" },
    { name: "TICKET", key: "issue_name", render: (r: IWorklog) => r.issue_name || "-" },
    {
      name: "USER",
      key: "user_name",
      render: (r: IWorklog) => (
        <div className="flex items-center gap-2">
          <Avatar
            name={r.user?.display_name}
            src={getFileURL(r.user?.avatar_url || "")}
            size={22}
            shape="circle"
          />
          <span>{r.user?.display_name}</span>
        </div>
      )
    },
    {
      name: "TIME",
      key: "total_hours",
      render: (r: IWorklog) => formatTime(r.hours || 0, r.minutes || 0)
    }
  ];


  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-3 py-2 w-8 text-left"><input type="checkbox" /></th>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-3 py-2 text-left text-gray-500"
              >
                {column.name}
              </th>
            ))}
            <th className="px-3 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {records.map((row) => (
            <tr key={row.id} className={`border-b ${row.is_draft ? "bg-green-50" : ""}`}>
              <td className="px-3 py-3"><input type="checkbox" /></td>

              {columns.map(col => (
                <td key={col.key} className="px-3 py-3">
                  {col.render(row)}
                </td>
              ))}

              <td className="px-3 py-3 flex gap-2">
                <button
                  onClick={() => onToggleTimer?.(row.id)}
                  className="border rounded px-2 py-1 text-xs"
                >
                  ⏸
                </button>
                <button
                  onClick={() => onResetTimer?.(row.id)}
                  className="border rounded px-2 py-1 text-xs"
                >
                  ↻
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

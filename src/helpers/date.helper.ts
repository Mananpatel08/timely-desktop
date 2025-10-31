export function formatDate(
  input: string | Date | null | undefined,
  locale = "en-US"
): string {
  if (!input) return "-";

  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(hour: number, minute: number): string {
  if (
    typeof hour !== "number" ||
    typeof minute !== "number" ||
    hour < 0 ||
    minute < 0 ||
    minute > 59
  ) {
    throw new Error("Invalid time input");
  }

  const h = hour.toString().padStart(2, "0");
  const m = minute.toString().padStart(2, "0");
  return `${h}:${m}`;
}

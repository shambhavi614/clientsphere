interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    DRAFT:
      "bg-slate-500/20 text-slate-300",

    SENT:
      "bg-blue-500/20 text-blue-400",

    PAID:
      "bg-green-500/20 text-green-400",

    OVERDUE:
      "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold
      ${styles[status as keyof typeof styles]}
    `}
    >
      {status}
    </span>
  );
}
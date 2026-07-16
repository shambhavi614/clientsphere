"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InvoiceStatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#0D1224]
        px-4
        py-3
        outline-none
      "
    >
      <option value="ALL">
        All
      </option>

      <option value="DRAFT">
        Draft
      </option>

      <option value="SENT">
        Sent
      </option>

      <option value="PAID">
        Paid
      </option>

      <option value="OVERDUE">
        Overdue
      </option>
    </select>
  );
}
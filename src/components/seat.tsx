type Props = {
  selected?: boolean;
  reserved?: boolean;
  label?: string;
  onClick?: () => void;
};

export default function Seat({ selected, reserved, onClick, label }: Props) {
  const color = reserved
    ? "bg-slate-300"
    : selected
    ? "bg-blue-600"
    : "bg-slate-500";

  return (
    <button
      disabled={reserved}
      onClick={onClick}
      className="group relative mx-[1px] flex flex-col items-center transition-all duration-200 hover:scale-110 disabled:hover:scale-100"
    >
      {label && (
        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition bg-slate-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
          {label}
        </div>
      )}

      <div className={`w-5 sm:w-6 h-3 rounded-t-md ${color}`} />

      <div className="flex items-center gap-[2px]">
        <div className={`w-1 h-4 rounded-full ${color}`} />
        <div className={`w-6 sm:w-7 h-5 rounded-md ${color} shadow-sm`} />
        <div className={`w-1 h-4 rounded-full ${color}`} />
      </div>
    </button>
  );
}
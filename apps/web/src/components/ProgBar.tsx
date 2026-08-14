export default function ProgBar({ progressValue = 50 }: { progressValue?: number }) {
  return (
    <div className="mx-1 w-full h-4 bg-slate-dark rounded-full overflow-hidden">
      <div
        className="h-full bg-[#58cc02] rounded-full transition-all duration-400 ease-in-out"
        style={{ width: `${progressValue}%` }}
      />
    </div>
  );
}

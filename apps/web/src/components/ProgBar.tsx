export default function ProgBar({ progressValue = 10 }: { progressValue?: number }) {
  // Clamp progress between 10% and 100% by default
  const displayProgress = Math.max(10, Math.min(100, progressValue));

  return (
    <div className="mx-1 w-full h-4 bg-slate-dark rounded-full overflow-hidden">
      <div
        className="h-full bg-[#58cc02] rounded-full transition-all duration-400 ease-in-out"
        style={{ width: `${displayProgress}%` }}
      />
    </div>
  );
}

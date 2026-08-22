interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Sabar... Loading Lesson" }: LoadingProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#131f24] text-white">
      <div className="w-12 h-12 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin"></div>
      <div className="mt-4 text-[#58CC02] font-bold font-mono text-lg text-center animate-pulse">
        {message}
      </div>
    </div>
  );
}

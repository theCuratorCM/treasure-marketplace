import { Spinner } from "./Spinner";

export const CenterLoadingDots = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <Spinner className="h-5 w-5 text-red-400" />
    </div>
  );
};

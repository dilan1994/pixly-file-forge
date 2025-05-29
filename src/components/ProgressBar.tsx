
interface ProgressBarProps {
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
}

export const ProgressBar = ({ progress, status }: ProgressBarProps) => {
  const getColorClass = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'converting':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${getColorClass()}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

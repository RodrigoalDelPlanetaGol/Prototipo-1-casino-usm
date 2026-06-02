import { CheckCircle2 } from "lucide-react";

type FeedbackToastProps = {
  message: string | null;
};

export default function FeedbackToast({ message }: FeedbackToastProps) {
  if (!message) return null;

  return (
    <div className="toast">
      <CheckCircle2 className="icon-btn" style={{ width: 20, height: 20 }} />
      {message}
    </div>
  );
}
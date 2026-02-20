import { useFormStatus } from "react-dom";

type Props = {
  idleText?: string;
  pendingText?: string;
};

export function SubmitButton({
  idleText = "Add",
  pendingText = "Adding…",
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        "rounded-lg px-3 py-2 text-sm font-medium",
        pending
          ? "bg-white/10 text-white/60"
          : "bg-white/15 hover:bg-white/20 text-white",
      ].join(" ")}
    >
      {pending ? pendingText : idleText}
    </button>
  );
}

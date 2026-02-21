import { useFormStatus } from "react-dom";

export function SubmitButton(props: { idle: string; pending: string }) {
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
      {pending ? props.pending : props.idle}
    </button>
  );
}

export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-8 w-48 rounded bg-slate-300" />
      <div className="space-y-4">
        <div className="h-32 rounded-xl bg-slate-300" />
        <div className="h-32 rounded-xl bg-slate-300" />
      </div>
    </div>
  );
}
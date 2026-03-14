export function SetupNotice() {
  return (
    <div className="rounded-[28px] border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
      Supabase environment variables are not configured yet. Copy
      <code className="mx-1 rounded bg-amber-100 px-1 py-0.5">.env.example</code>
      to <code className="mx-1 rounded bg-amber-100 px-1 py-0.5">.env.local</code>
      and fill in the required values before using the builder.
    </div>
  );
}

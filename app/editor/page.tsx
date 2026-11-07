import { auth } from "@clerk/nextjs/server";

export default async function EditorPage() {
  await auth.protect();

  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      <p>Canvas</p>
    </div>
  );
}

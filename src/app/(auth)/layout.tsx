import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (userId)
    redirect("/");


  return (
    <div className="flex justify-center w-full">
      {children}
    </div>
  );
}

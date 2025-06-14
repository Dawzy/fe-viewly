import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const { userId } = await auth();

  if (userId)
    redirect("/lists");

  return (
    <div className="page-container justify-center items-center !gap-6">
      <Image src="/Logo.svg" alt="" width={128} height={128}/>
      <h1 className="text-4xl md:text-6xl font-bold text-center text-accent-foreground">
        Welcome to <span className="text-accent">Viewly</span>
      </h1>
      <p className="text-center text-lg md:text-xl max-w-xl text-gray-300">
        Create and share beautifully organized movie lists. Track your watch time, and explore genres!
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Button className="min-w-30 py-5 px-6 text-lg" asChild>
          <SignInButton />
        </Button>
        <Button className="min-w-30 py-5 px-6 text-lg" asChild>
          <SignUpButton />
        </Button>
      </div>
      <div className="mt-12 max-w-4xl w-full grid md:grid-cols-3 gap-6 text-center *:bg-surface">
        <div className="rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gold-500">Watchlists</h3>
          <p className="text-gray-400 text-sm mt-2">
            Group your favorite movies into custom lists with ease.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gold-500">Time Tracking</h3>
          <p className="text-gray-400 text-sm mt-2">
            Know how much time you&apos;ve spent watching.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gold-500">Share</h3>
          <p className="text-gray-400 text-sm mt-2">
            Share your watchlists with friends.
          </p>
        </div>
      </div>
    </div>
  );
}
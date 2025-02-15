import Link from "next/link";

import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Navbar from "./_components/navbar";
import HeroSection from "./_components/hero";
export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex w-full flex-col items-center pt-12">
        <Navbar />
        <div className="">
          <HeroSection />
        </div>
      </main>
    </HydrateClient>
  );
}

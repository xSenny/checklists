"use server";

import { signIn } from "@/server/auth";

export const signInWithDiscord = async () => {
  await signIn("discord", { callbackUrl: "/dashboard" });
};
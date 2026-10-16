import { cache } from "react";
import { headers } from "next/headers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { i18n, locales } from "@better-auth/i18n";
import { db } from "@/lib/db";
import * as schema from "@/lib/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
      requireLocalEmailVerified: false,
    },
  },
  rateLimit: {
    enabled: true, // enable for development
    window: 60, // second
    max: 100, // any /api/auth/*
    customRules: {
      "/sign-up/email": {
        window: 60,
        max: 5,
      },
      "/sign-in/email": {
        window: 60,
        max: 10,
      },
      "/sign-in/social": {
        window: 60,
        max: 20,
      },
    },
  },
  plugins: [
    nextCookies(),
    i18n({
      defaultLocale: "vi",
      translations: {
        vi: locales.vi,
      },
      // Force Vietnamese for the whole app
      detection: ["callback"],
      getLocale: () => "vi",
    }),
  ],
});

// One session lookup per request, shared by header and footer.
export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});
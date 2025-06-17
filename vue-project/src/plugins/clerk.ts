// // src/plugins/clerk.ts
// import type { App } from "vue";
// import { inject, provide } from "vue";
// import { Clerk } from "@clerk/clerk-js";

// const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string);

// export async function setupClerk(app: App): Promise<void> {
//   await clerk.load();
//   provide("clerk", clerk);
//   app.config.globalProperties.$clerk = clerk;
// }

// export function useClerk(): Clerk {
//   const clerkInstance = inject<Clerk>("clerk");
//   if (!clerkInstance) {
//     throw new Error("Clerk is not provided");
//   }
//   return clerkInstance;
// }

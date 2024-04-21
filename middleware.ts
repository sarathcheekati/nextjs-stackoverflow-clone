import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks/clerk",
    "/question/:id",
    "/tags/:id",
    "/tags",
    "/community",
    "/profile/:id",
    "/jobs",
  ],
  ignoredRoutes: ["/api/webhooks", "/api/chatgpt"],
});

export const config = {
  //matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

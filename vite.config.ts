import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes: async (defineRoutes) => {
        // If you're using remix-flat-routes, import it properly
        const { flatRoutes } = await import("remix-flat-routes");
        return flatRoutes("routes", defineRoutes, {
          ignoredRouteFiles: ["**/.*"],
          paramPrefixChar: "_auth+",
        });
      },
    }),
    tsconfigPaths(),
  ],
});

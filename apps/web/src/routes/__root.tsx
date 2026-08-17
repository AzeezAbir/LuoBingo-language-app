import "normalize.css";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Scripts, createRootRoute, Outlet } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem("theme");var mode=(stored==="light"||stored==="dark"||stored==="auto")?stored:"auto";var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var resolved=mode==="auto"?(prefersDark?"dark":"light"):mode;var root=document.documentElement;root.classList.remove("light","dark");root.classList.add(resolved);if(mode==="auto"){root.removeAttribute("data-theme")}else{root.setAttribute("data-theme",mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

const NotFound = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
)

export const Route = createRootRoute({
  component: () => <RootDocument><Outlet /></RootDocument>,
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="http://localhost:8097"></script>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {/* <Header /> */}
          {children}
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}

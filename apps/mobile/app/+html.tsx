import * as React from "react";

// This file is web-only and used to configure the root HTML for single-page applications.
export default function HTML({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Sync theme synchronously in head to prevent FOUC (flash of unstyled content) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const localTheme = localStorage.getItem('color-scheme');
                if (localTheme === 'dark' || (!localTheme && systemPrefersDark)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.backgroundColor = '#131f24';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.backgroundColor = '#e7f3ec';
                }
              } catch (e) {}
            `,
          }}
        />

        {/* Required React Native Web Reset Styles (prevents layout collapsing to height 0) */}
        <style id="expo-router-html">
          {`
            html, body, #root {
              height: 100%;
              display: flex;
              flex-direction: column;
            }
          `}
        </style>
      </head>
      <body>{children}</body>
    </html>
  );
}

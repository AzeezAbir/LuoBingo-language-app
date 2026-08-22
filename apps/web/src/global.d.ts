/// <reference types="vite/client" />
/// <reference types="@tanstack/react-router" />

import "./router";
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    [key: string]: any;
  }
}

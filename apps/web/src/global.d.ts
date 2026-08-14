/// <reference types="vite/client" />
/// <reference types="@tanstack/react-router" />

import './router';

declare module '@tanstack/react-router' {
  // Global fallback: If the IDE fails to parse routeTree.gen.ts, 
  // this prevents the parameter of 'createFileRoute' from defaulting to 'undefined'.
  interface FileRoutesByPath {
    [key: string]: any;
  }
}

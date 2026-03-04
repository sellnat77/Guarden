/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_GD_GRAPHQL_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

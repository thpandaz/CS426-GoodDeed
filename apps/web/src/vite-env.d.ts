/// <reference types="vite/client" />
interface ImportMetaEnv {
readonly VITE_API_URL: string
// add other keys you use…
}

interface ImportMeta {
readonly env: ImportMetaEnv
}
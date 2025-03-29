// allows for importing of svg files
declare module '*.svg' {
    const content: string;
    export default content;
}
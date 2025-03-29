// allows for importing of svg files
declare module '*.svg' {
    const content: string;
    export default content;
}

// allows for importing of mp4 files
declare module '*.mp4' {
    const src: string;
    export default src;
}
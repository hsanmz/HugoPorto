declare module 'mermaid' {
  const mermaid: {
    initialize: (config: { startOnLoad?: boolean; securityLevel?: string }) => void;
    run: (options: { nodes: HTMLElement[] }) => Promise<void>;
    default?: typeof mermaid;
  };
  export default mermaid;
}
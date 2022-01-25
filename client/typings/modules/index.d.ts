declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.json';

declare module '*.md';

declare module '*.css' {
    const styles: Record<string, string>;
    export default styles;
}

declare module '*.svg' {
    import { FC, SVGProps, ReactSVGElement } from 'react';

    /**
     * @see https://react-svgr.com/
     */
    const ReactComponent: FC<SVGProps<ReactSVGElement>>;

    export default ReactComponent;
}

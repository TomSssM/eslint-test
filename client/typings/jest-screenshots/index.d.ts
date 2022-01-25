declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchScreenshot(options: { width: number; height: number }): Promise<R>;
        }
    }
    interface Window {
        includedCssFiles?: string[];
    }
}

export {};

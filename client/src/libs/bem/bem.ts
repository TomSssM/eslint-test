export interface BemOptions {
    elem?: string;
    mods?: Record<string, string | boolean | undefined>;
    mix?: string;
}

export function bem(block: string): (opts?: BemOptions | string) => string {
    return (opts?: BemOptions | string): string => {
        if (!opts) {
            return block;
        }
        if (typeof opts === 'string') {
            return `${block}__${opts}`;
        }

        const { elem, mods, mix } = opts;
        const base = elem ? `${block}__${elem}` : block;
        const classes = mix ? [base, mix] : [base];

        if (mods) {
            Object.entries(mods).forEach(([mod, value]) => {
                if (value) {
                    classes.push(value === true ? `${base}_${mod}` : `${base}_${mod}_${value}`);
                }
            });
        }

        return classes.join(' ');
    };
}

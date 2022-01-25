import React, { FC, SVGProps } from 'react';

interface SvgIconWithSize {
    size: string | number;
    width?: undefined;
    height?: undefined;
}

interface SvgIconWithoutSize {
    width: string | number;
    height: string | number;
    size?: undefined;
}

export type SvgIconProps = SVGProps<SVGSVGElement> & (SvgIconWithoutSize | SvgIconWithSize);

export const SvgIcon: FC<SvgIconProps> = ({ size, width, height, ...props }) => (
    <svg
        width={size ?? width}
        height={size ?? height}
        {...props}
    />
);

import React, { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@client-libs/mindstorms/components/icon/SvgIcon';
import './SvgDirectionIcon.css';
import { bem } from '../../../../bem/bem';

export const enum SvgDirectionIconRoute {
    Left = 'left',
    Right = 'right',
    Up = 'up',
    Down = 'down'
}

export type SvgDirectionIconProps = {
    route: SvgDirectionIconRoute;
} & SvgIconProps;

const cls = bem('svg-direction-icon');

export const SvgDirectionIcon: FC<SvgDirectionIconProps> = (
    {
        route,
        className,
        children,
        ...props
    }
) => (
    <SvgIcon
        className={cls({
            mods: { direction: route },
            mix: className
        })}
        {...props}
    >
        {children}
    </SvgIcon>
);

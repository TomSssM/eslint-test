import React, { FC } from 'react';

import { SvgIconProps } from '@client-libs/mindstorms/components/icon/SvgIcon';
import { AngleIcon } from '@client-libs/mindstorms/components/icon/angle/AngleIcon';
import { SvgDirectionIconRoute } from '@client-libs/mindstorms/components/icon/direction/SvgDirectionIcon';

export const AngleRightIcon: FC<SvgIconProps> = (props) => (
    <AngleIcon route={SvgDirectionIconRoute.Right} {...props} />
);

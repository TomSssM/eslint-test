import React, { FC } from 'react';

import { SvgIconProps } from '@client-libs/mindstorms/components/icon/SvgIcon';
import { AngleIcon } from '@client-libs/mindstorms/components/icon/angle/AngleIcon';
import { SvgDirectionIconRoute } from '@client-libs/mindstorms/components/icon/direction/SvgDirectionIcon';

export const AngleDownIcon: FC<SvgIconProps> = (props) => (
    <AngleIcon route={SvgDirectionIconRoute.Down} {...props} />
);

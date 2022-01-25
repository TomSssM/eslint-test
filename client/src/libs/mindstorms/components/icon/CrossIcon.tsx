import React, { FC } from 'react';

import { SvgIcon, SvgIconProps } from './SvgIcon';

export const CrossIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
        <path
            color="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.2071 6.20711C19.5976 5.81658 19.5976 5.18342 19.2071 4.79289C18.8166 4.40237 18.1834 4.40237 17.7929 4.79289L12 10.5858L6.20711 4.79289C5.81658 4.40237 5.18342 4.40237 4.79289 4.79289C4.40237 5.18342 4.40237 5.81658 4.79289 6.20711L10.5858 12L4.79289 17.7929C4.40237 18.1834 4.40237 18.8166 4.79289 19.2071C5.18342 19.5976 5.81658 19.5976 6.20711 19.2071L12 13.4142L17.7929 19.2071C18.1834 19.5976 18.8166 19.5976 19.2071 19.2071C19.5976 18.8166 19.5976 18.1834 19.2071 17.7929L13.4142 12L19.2071 6.20711Z"
        />
    </SvgIcon>
);
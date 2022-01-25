import React, { FC } from 'react';

import { SvgIcon, SvgIconProps } from './SvgIcon';

export const SearchIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
        <path
            color="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5 18C12.2105 18 13.7873 17.4274 15.0491 16.4633L19.7929 21.2071C20.1834 21.5976 20.8166 21.5976 21.2071 21.2071C21.5976 20.8166 21.5976 20.1834 21.2071 19.7929L16.4633 15.0491C17.4274 13.7873 18 12.2105 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18ZM16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5Z"
        />
    </SvgIcon>
);

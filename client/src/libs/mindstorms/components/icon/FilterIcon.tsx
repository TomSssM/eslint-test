import React, { FC } from 'react';

import { SvgIcon, SvgIconProps } from './SvgIcon';

export const FilterIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
        <path
            color="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 10.9979C14.1131 10.9978 13.2514 10.7031 12.5502 10.1601C11.849 9.61711 11.3481 8.85657 11.126 7.99794H3C2.73478 7.99794 2.48043 7.89259 2.29289 7.70505C2.10536 7.51751 2 7.26316 2 6.99794C2 6.73273 2.10536 6.47837 2.29289 6.29084C2.48043 6.1033 2.73478 5.99794 3 5.99794H11.126C11.3484 5.1397 11.8496 4.37962 12.5507 3.83702C13.2519 3.29441 14.1134 3 15 3C15.8866 3 16.7481 3.29441 17.4493 3.83702C18.1504 4.37962 18.6516 5.1397 18.874 5.99794H21C21.2652 5.99794 21.5196 6.1033 21.7071 6.29084C21.8946 6.47837 22 6.73273 22 6.99794C22 7.26316 21.8946 7.51751 21.7071 7.70505C21.5196 7.89259 21.2652 7.99794 21 7.99794H18.874C18.652 8.85657 18.151 9.61711 17.4498 10.1601C16.7486 10.7031 15.8869 10.9978 15 10.9979ZM3 15.9979C2.73478 15.9979 2.48043 16.1033 2.29289 16.2908C2.10536 16.4784 2 16.7327 2 16.9979C2 17.2632 2.10536 17.5175 2.29289 17.7051C2.48043 17.8926 2.73478 17.9979 3 17.9979H5.126C5.34844 18.8562 5.84957 19.6163 6.55074 20.1589C7.2519 20.7015 8.1134 20.9959 9 20.9959C9.8866 20.9959 10.7481 20.7015 11.4493 20.1589C12.1504 19.6163 12.6516 18.8562 12.874 17.9979H21C21.2652 17.9979 21.5196 17.8926 21.7071 17.7051C21.8946 17.5175 22 17.2632 22 16.9979C22 16.7327 21.8946 16.4784 21.7071 16.2908C21.5196 16.1033 21.2652 15.9979 21 15.9979H12.874C12.6516 15.1397 12.1504 14.3796 11.4493 13.837C10.7481 13.2944 9.8866 13 9 13C8.1134 13 7.2519 13.2944 6.55074 13.837C5.84957 14.3796 5.34844 15.1397 5.126 15.9979H3ZM15 8.99794C15.5304 8.99794 16.0391 8.78723 16.4142 8.41216C16.7893 8.03708 17 7.52838 17 6.99794C17 6.46751 16.7893 5.9588 16.4142 5.58373C16.0391 5.20866 15.5304 4.99794 15 4.99794C14.4696 4.99794 13.9609 5.20866 13.5858 5.58373C13.2107 5.9588 13 6.46751 13 6.99794C13 7.52838 13.2107 8.03708 13.5858 8.41216C13.9609 8.78723 14.4696 8.99794 15 8.99794ZM11 16.9979C11 17.5284 10.7893 18.0371 10.4142 18.4122C10.0391 18.7872 9.53043 18.9979 9 18.9979C8.46957 18.9979 7.96086 18.7872 7.58579 18.4122C7.21071 18.0371 7 17.5284 7 16.9979C7 16.4675 7.21071 15.9588 7.58579 15.5837C7.96086 15.2087 8.46957 14.9979 9 14.9979C9.53043 14.9979 10.0391 15.2087 10.4142 15.5837C10.7893 15.9588 11 16.4675 11 16.9979Z"
        />
    </SvgIcon>
);
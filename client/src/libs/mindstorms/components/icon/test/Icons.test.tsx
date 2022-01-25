import React, { FC } from 'react';

import { SvgIconProps } from '@client-libs/mindstorms/components/icon/SvgIcon';

import { icons as groupsIcons } from '../Icons.stories';
import { makeScreenshot } from '../../../../test-utils/screenshot';

const icons = groupsIcons.reduce((prev: FC<SvgIconProps>[], cur) => {
    return prev.concat(cur.icons);
}, []);

describe('Icons', () => {
    describe.each(icons)('screenshot', Icon =>
        it(`make screenshot ${Icon.name}`, async () => {
            const Component: FC = () => (
                <>
                    <Icon width={24} height={24} fill="black" />
                    <Icon width={48} height={48} fill="red" />
                    <Icon size={16} />
                </>
            );
            await makeScreenshot(<Component />);
        }),
    );
});

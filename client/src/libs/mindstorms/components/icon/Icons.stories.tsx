import React from 'react';
import { ComponentStory } from '@storybook/react';
import { PlusIcon } from '@client-libs/mindstorms/components/icon/PlusIcon';
import { CrossIcon } from '@client-libs/mindstorms/components/icon/CrossIcon';
import { AngleLeftIcon } from '@client-libs/mindstorms/components/icon/angle/AngleLeftIcon';
import { AngleRightIcon } from '@client-libs/mindstorms/components/icon/angle/AngleRightIcon';
import { AngleUpIcon } from '@client-libs/mindstorms/components/icon/angle/AngleUpIcon';
import { AngleDownIcon } from '@client-libs/mindstorms/components/icon/angle/AngleDownIcon';
import {
    SvgIcon,
    SvgIconProps,
} from '@client-libs/mindstorms/components/icon/SvgIcon';
import { FilterIcon } from '@client-libs/mindstorms/components/icon/FilterIcon';
import { BellIcon } from '@client-libs/mindstorms/components/icon/BellIcon';
import { MessageIcon } from '@client-libs/mindstorms/components/icon/MessageIcon';
import { QuestionIcon } from '@client-libs/mindstorms/components/icon/QuestionIcon';
import { SearchIcon } from '@client-libs/mindstorms/components/icon/SearchIcon';
import { getCommonOptions } from '../../storybook';

const { title, component, decorators, parameters } = getCommonOptions({
    component: SvgIcon,
    figma: 'https://www.figma.com/file/dVAXYJ0f3EyTZIHwsE8zZE/DL-Atoms?node-id=29953%3A0',
    description: 'Icons',
});

export default {
    title,
    component,
    decorators,
    parameters,
};

export const icons: { title: string; icons: React.FC<SvgIconProps>[] }[] = [
    {
        title: 'Actions',
        icons: [
            CrossIcon,
            PlusIcon,
            AngleLeftIcon,
            AngleRightIcon,
            AngleUpIcon,
            AngleDownIcon,
            FilterIcon,
        ],
    },
    {
        title: 'Status',
        icons: [QuestionIcon],
    },
    {
        title: 'Chats & Social',
        icons: [MessageIcon, BellIcon, SearchIcon],
    },
];

export const Icons: ComponentStory<typeof SvgIcon> = props => (
    <>
        {icons.map(({ title: groupTitle, icons: groupIcons }) => (
            <div key={groupTitle}>
                <h3 style={{ marginLeft: '20px' }}>{title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {groupIcons.map((Icon, key) => (
                        <div
                            key={key}
                            style={{
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '120px',
                            }}
                        >
                            <Icon {...props} />
                            <p
                                style={{
                                    textAlign: 'center',
                                    overflowWrap: 'anywhere',
                                }}
                            >
                                {Icon.displayName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </>
);

Icons.args = {
    width: undefined,
    height: undefined,
    size: 24,
    fill: 'black',
};

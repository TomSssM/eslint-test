import React from 'react';
import { PlusIcon } from '../icon/PlusIcon';
import { Button } from './button';
import {
    BaseButtonProps,
    ButtonProps,
    ButtonSize,
    ButtonView,
    IconButtonProps,
    TextButtonProps,
} from './button-props';
import {
    getCommonOptions,
    getPrimaryStory,
    getStoryForProp,
} from '../../storybook';

const FIGMA_URL =
    'https://www.figma.com/file/i6xFWsF5ha8oRgMHUjnkGQ/New-Metrica.-Library?node-id=1310%3A1353';
const defaultProps: BaseButtonProps = {
    view: ButtonView.Shade,
    size: ButtonSize.S32,
    isDisabled: false,
} as const;

const defaultTextProps: TextButtonProps = {
    ...defaultProps,
    children: 'Button',
    iconLeft: <PlusIcon fill="currentColor" size={16} />,
} as const;

const dd = 12;

dd;

const { title, component, decorators, parameters } = getCommonOptions({
    component: Button,
    figma: FIGMA_URL,
    description: 'Button',
});

export default {
    title,
    component,
    decorators,
    argTypes: {
        onClick: { action: 'click' },
    },
    parameters,
};

export const Main = getPrimaryStory<ButtonProps>({
    Component: Button,
    defaultProps: defaultTextProps,
});

export const View = getStoryForProp<ButtonProps, 'view'>({
    Component: Button,
    defaultProps: defaultTextProps,
    properties: [
        { name: 'view', values: [ButtonView.Shade, ButtonView.Contrast] },
    ],
});

export const Size = getStoryForProp<ButtonProps, 'size'>({
    Component: Button,
    defaultProps: defaultTextProps,
    properties: [
        {
            name: 'size',
            values: [ButtonSize.S32, ButtonSize.S44, ButtonSize.S56],
        },
    ],
});

export const Disabled = getStoryForProp<ButtonProps, 'isDisabled'>({
    Component: Button,
    defaultProps: defaultTextProps,
    properties: [{ name: 'isDisabled', values: [true] }],
});

export const IconButton = getStoryForProp<IconButtonProps, 'icon'>({
    Component: Button,
    defaultProps: {
        ...defaultProps,
        icon: <PlusIcon fill="currentColor" size={16} />,
    },
    properties: [
        { name: 'icon', values: [<PlusIcon fill="currentColor" size={16} />] },
    ],
});

export const TextButtonWithIcon = getStoryForProp<
    TextButtonProps,
    'iconLeft' | 'iconRight'
>({
    Component: Button,
    defaultProps: defaultTextProps,
    properties: [
        {
            name: 'iconLeft',
            values: [<PlusIcon fill="currentColor" size={16} />],
        },
        {
            name: 'iconRight',
            values: [<PlusIcon fill="currentColor" size={16} />],
        },
    ],
});

// One story with all configurations for screenshot test
// TODO support IconButtonProps
export const All = getStoryForProp<TextButtonProps, keyof TextButtonProps>({
    Component: Button,
    defaultProps: defaultTextProps,
    properties: [
        {
            name: 'size',
            values: [ButtonSize.S32, ButtonSize.S44, ButtonSize.S56],
        },
        { name: 'view', values: [ButtonView.Shade, ButtonView.Contrast] },
        { name: 'isDisabled', values: [false, true] },
        {
            name: 'iconLeft',
            values: [<PlusIcon fill="currentColor" size={16} />],
        },
        {
            name: 'iconRight',
            values: [<PlusIcon fill="currentColor" size={16} />],
        },
    ],
});

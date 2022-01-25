import React from 'react';

// The size of the button depends on its height
export const enum ButtonSize {
    S56 ='s56',
    S44 = 's44',
    S32 = 's32'
}

export const enum ButtonView {
    Contrast = 'contrast',
    Shade = 'shade'
}

// Auto - width to fit content, Max - width to fit container
export const enum ButtonWidth {
    Auto = 'auto',
    Max = 'max'
}

export const enum ButtonHtmlType {
    Button = 'button',
    Submit = 'submit',
    Reset = 'reset'
}

export interface BaseButtonProps {
    size: ButtonSize;
    view: ButtonView;
    isDisabled?: boolean;
    inProgress?: boolean;
    className?: string;
    htmlType?: ButtonHtmlType;
    onClick?: React.MouseEventHandler;
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;
}

export type TextButtonProps = {
    children: string;
    width?: ButtonWidth;
    iconLeft?: React.ReactChild;
    iconRight?: React.ReactChild;
} & BaseButtonProps;

export type IconButtonProps = {
    icon: React.ReactChild;
} & BaseButtonProps;

export type ButtonProps = TextButtonProps | IconButtonProps;

import React, { FC, ForwardedRef, forwardRef } from 'react';
import './button.css';
import { bem } from '../../../bem/bem';
import { ButtonProps, ButtonWidth, TextButtonProps } from './button-props';

const cls = bem('button');

const TextButtonContent: FC<TextButtonProps> = (props: TextButtonProps) => {
    const { iconLeft, iconRight } = props;

    return (
        <>
            {iconLeft}
            <span
                className={cls({
                    elem: 'text',
                    mods: {
                        'with-left-icon': !!iconLeft,
                        'with-right-icon': !!iconRight
                    }
                })}
            >
                {props.children}
            </span>
            {iconRight}
        </>
    );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
    props: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const {
        size,
        view,
    } = props;

    return (
        <button
            ref={ref}
            className={cls({
                mods: {
                    width: 'width' in props ? props.width : ButtonWidth.Auto,
                    size,
                    view,
                    mode: 'icon' in props ? 'icon' : 'text'
                },
                mix: props.className
            })}
            disabled={props.isDisabled}
            type={props.htmlType}
            onClick={props.onClick}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
        >
            {'icon' in props ? props.icon : <TextButtonContent {...props} />}
        </button>
    );
});

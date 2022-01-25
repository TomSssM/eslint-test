import React, { FC, ForwardedRef, forwardRef } from 'react';
import './button.css';
import { ButtonProps, TextButtonProps } from './button-props';

const TextButtonContent: FC<TextButtonProps> = (props: TextButtonProps) => {
    const { iconLeft, iconRight } = props;

    return (
        <>
            {iconLeft}
            <span
                className="btn"
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

    // eslint-disable-next-line no-console
    console.log({ size, view });

    return (
        <button
            ref={ref}
            className="btn2"
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

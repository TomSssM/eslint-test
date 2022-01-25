/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { ComponentStory } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import './colors.css';

type Options = {
    component: React.ComponentType;
    figma?: string;
    description: string;
};

type StoryOptions<P> = {
    Component: React.ComponentType<P>;
    defaultProps: P;
    description?: string;
};

type PropStoryOptions<P, K extends keyof P> = StoryOptions<P> & {
    properties: Array<{ name: K; values: Array<P[K]> }>;
};

export const getCommonOptions = ({
    component,
    figma,
    description,
}: Options) => ({
    title: component.displayName,
    component,
    decorators: [figma && withDesign].filter(Boolean),
    parameters: {
        docs: {
            description: {
                component: description,
            },
        },
        design: figma && {
            type: 'figma',
            url: figma,
        },
    },
});

export function getPrimaryStory<P>({
    Component,
    defaultProps,
    description,
}: StoryOptions<P>) {
    const Primary = (props: P) => (
        <Component {...props}>{Component.displayName}</Component>
    );

    Primary.args = defaultProps;
    Primary.parameters = {
        docs: {
            description: {
                story: description,
            },
        },
    };

    return Primary;
}

export const getStoryForProp = <P, K extends keyof P>({
    Component,
    defaultProps,
    properties,
    description,
}: PropStoryOptions<P, K>) => {
    const Story: ComponentStory<React.ComponentType<Partial<P>>> = (
        other: Partial<P>,
    ) => {
        return (
            <>
                {properties.map((property, j) => {
                    const { name, values } = property;
                    return (
                        <div key={j} style={{ marginBottom: '8px' }}>
                            {values.map((value, i) => {
                                const props = {
                                    ...defaultProps,
                                    ...other,
                                    [name]: value,
                                };

                                return (
                                    <div
                                        key={i}
                                        style={{
                                            marginRight: '8px',
                                            display: 'inline-block',
                                        }}
                                    >
                                        <Component {...props}>
                                            {typeof value === 'string' ? (
                                                <>
                                                    {name}: {value}
                                                </>
                                            ) : (
                                                name
                                            )}
                                        </Component>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </>
        );
    };
    Story.args = {};
    Story.parameters = {
        docs: {
            description: {
                story: description,
            },
        },
        controls: {
            disabled: true,
        },
    };

    return Story;
};

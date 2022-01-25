import { CounterEntity } from '@shared/metrika-dto/entities/counter';
import React, { FC } from 'react';
import { Counter } from "./Counter";

export default {
    title: 'Counter',
};


export const Primary: FC = () => (
    <Counter counter={{
        id: '1',
        name: 'счетчик',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any as CounterEntity} />
);

Primary.args = {};
Primary.parameters = {};

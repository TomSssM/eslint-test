import React from 'react';
import renderer from 'react-test-renderer';
import { CounterEntity } from '@shared/metrika-dto/entities/counter';
import { Counter } from './Counter';

describe('Counter', () => {
    test('should render', () => {
        const component = renderer.create(
            <Counter counter={{ id: '123', name: 'test' } as CounterEntity} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

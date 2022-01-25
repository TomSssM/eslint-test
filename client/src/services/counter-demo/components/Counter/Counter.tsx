import React from 'react';
import { CounterEntity } from '@shared/metrika-dto/entities/counter';
import styles from './Counter.css';
import MetricaLogo from './metrica.svg';

export interface CounterProps {
    counter: CounterEntity;
}

export function Counter({ counter: { id, name } }: CounterProps): React.ReactElement {
    return (
        <div className={styles.Counter}>
            <div className={styles.logoContainer}>
                <MetricaLogo />
            </div>
            <div className={styles.anotherContainer} />
            <span>{name}</span>
            <span>({id})</span>
        </div>
    );
}

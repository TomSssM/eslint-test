import React, {
    FC
    // useEffect
} from 'react';
import styles from './App.css';
// import { Counter } from '../../components/Counter/Counter';
// import { CounterEntity } from '@shared/metrika-dto/entities/counter';
// import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// import { getEntitySelector } from '@client-libs/entity-storage/selectors';
import { Route, Routes, BrowserRouter, Link, Outlet } from "react-router-dom";
import { ClientRoutes } from './AppRoutes';

// import { initApp } from '../../slices/app';

const ListPage: FC = () => {
    return <div>List</div>;
};

const DashboardPage: FC = () => (
    <div>Dashboard</div>
);

const SettingsPage: FC = () => (
    <div>Settings</div>
);

const AppLayout: FC = ({children}) => (
    <div>
        <div>
        <li>
            <Link to="/list">List</Link>
        </li>
        <li>
            <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
            <Link to="/settings">Settings</Link>
        </li>
        </div>
        <div className={styles.content}>
            {children}
        </div>
    </div>
);

export const AppRoutes = (): JSX.Element => (
    <Routes>
        <Route path={ClientRoutes.Base} element={
            <AppLayout >
                <Outlet />
            </AppLayout>
        } >
            <Route path={ClientRoutes.List} element={
                <ListPage />
            } />
            <Route path={ClientRoutes.Dashboard} element={
                <DashboardPage />
            } />
            <Route path={ClientRoutes.Settings} element={<SettingsPage />} />
        </Route>
    </Routes>
);

const App: FC = () => {
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(initApp());
    // }, []);
    //
    // const entity = useAppSelector(getEntitySelector({
    //     entityType: CounterEntity,
    //     alias: 'defaultCounter'
    // }));

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
        // <div className={styles.App}>
        //     <header className={styles.header}>
        //         {entity ? <Counter counter={entity}/> : 'Loading…'}
        //     </header>
        // </div>
    );
};

export default App;

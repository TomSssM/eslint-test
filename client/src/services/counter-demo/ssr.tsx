import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './containers/App/App';
import { ClientRoutes } from './containers/App/AppRoutes';

function ssr(url: string): string {
    return ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={url}>
                <AppRoutes />
            </StaticRouter>
        </React.StrictMode>
    );
}

export default Object.keys(ClientRoutes).reduce<Record<string, string>>((acc, route) => {
    acc[route] = ssr(ClientRoutes[route]);
    return acc;
}, {});


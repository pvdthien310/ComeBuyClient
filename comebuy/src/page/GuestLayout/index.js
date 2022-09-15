import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../../container/NotFound';

function GuestLayout(props) {
    const showRoutes = (routes) => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => <Route key={index} path={route.path} element={route.page} />);
        }
        result.push(<Route key={routes.length} path="/error" element={<NotFound />} />);
        return result;
    };

    return (
        <div style={{ height: 850, width: '100%' }}>
            <div style={{ height: '80%', width: '100%' }}>
                <Routes>
                    {showRoutes(props.routes)}
                    {/* <Route element={
            <Navigate replace to={{ pathname: '/' }} />
          }>
          </Route> */}
                </Routes>
            </div>
        </div>
    );
}

export default GuestLayout;

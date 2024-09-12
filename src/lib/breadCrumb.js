import { matchRoutes } from 'react-router-dom';

export const getBreadcrumbItems = (routes, location) => {
    const matchedRoutes = matchRoutes(routes, location);

    return matchedRoutes.map(route => ({
        path: route.pathname,
        breadcrumbName: route.route.breadcrumbName || '',
    }));
};
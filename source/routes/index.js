import Router from 'rawblock/utils/router';
import deserialize from 'rawblock/utils/deserialize';

const routesDescriptor = {
    routes: {
        search: {
            matchers: ['search/*', 'search'],
            install(){
                return System.import('../layouts/Search');
            },
        },
        home: {
            matchers: ['/', 'index.htm*'],
            install(){
                return System.import('../layouts/Home');
            },
        },
        catchAll: {
            matchers: '*',
            install(){
                return System.import('../layouts/Error');
            },
        },
    },
};

function createRouteHandler(route, routeName){
    return function routeHandler(params) {
        const promises = [];
        const payload = {
            routeName,
            params,
            options: deserialize(location.search),
        };

        if(!route.component && route.install){
            promises.push(route.install(payload).then(component => {
                route.component = component.default;
            }));
        }

        if(route.onEnter){
            const promise = route.onEnter(payload);

            if(promise && promise.then){
                promises.push(promise);
            }
        }

        payload.isComplete = !promises.length;

        if(routesDescriptor.dispatchers){
            routesDescriptor.dispatchers.locationChanged(payload);
        } else {
            routesDescriptor.state = payload;
        }

        if(!payload.isComplete){
            Promise.all(promises).then(()=>{
                payload.isComplete = true;
                if(routesDescriptor.dispatchers){
                    routesDescriptor.dispatchers.locationChanged(payload);
                }
            });
        }

        return route.fallThrough && route.fallThrough(payload);
    };
}


function addRoutes(routes){

    System.import('../app.js').then((app) => {
        routesDescriptor.dispatchers = app.default.locationDispatchers;

        if(routesDescriptor.state){
            routesDescriptor.dispatchers.locationChanged(routesDescriptor.state);
        }
    });

    for(let routeName in routes){
        let route = routes[routeName];
        const handler = createRouteHandler(route, routeName);

        route.name = routeName;

        Router.add(route.matchers, handler);
    }

    Router.applyRoutesIfNeeded();
}

addRoutes(routesDescriptor.routes);

export default routesDescriptor;


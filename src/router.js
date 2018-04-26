import React from 'react';
import { routerRedux, Router, Redirect, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
const { ConnectedRouter } = routerRedux
import MainLayout from './components/MainLayout/MainLayout';
import SignUp from "./components/SignUp/SignUp";

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/Home',
      models: () => [import('./models/Home')],
      component: () => import('./components/Home/Home'),
    },

    {
      path: '/Earn',
      models: () => [import('./models/Earn')],
      component: () => import('./components/Earn/Earn'),
    },
    {
      path: '/Thirdpartyconfig',
      models: () => [import('./models/Thirdparyconfig')],
      component: () => import('./components/Thirdparyconfig/Thirdparyconfig'),
    },
    {
      path: '/Getshopid',
      models: () => [import('./models/Getshopid')],
      component: () => import('./components/Getshopid/Getshopid'),
    },
    {
      path: '/Cloudconfig',
      models: () => [import('./models/Cloudconfig')],
      component: () => import('./components/Cloudconfig/Cloudconfig'),
    },
    {
      path: '/Withdrawal',
      models: () => [import('./models/Withdrawal')],
      component: () => import('./components/Withdrawal/Withdrawal'),
    },
    {
      path: '/ApplyForRecords',
      models: () => [import('./models/ApplyForRecords')],
      component: () => import('./components/ApplyForRecords/ApplyForRecords'),
    },
    {
      path: '/ProfitDetail',
      models: () => [import('./models/ProfitDetail')],
      component: () => import('./components/ProfitDetail/ProfitDetail'),
    },
    {
      path: '/UserList',
      models: () => [import('./models/UserList')],
      component: () => import('./components/UserList/UserList'),
    },
    {
      path: '/SignUp',
      models: () => [import('./models/SignUp')],
      component: () => import('./components/SignUp/SignUp'),
    },
    {
      path: '/Set',
      models: () => [import('./models/Set')],
      component: () => import('./components/Set/Set'),
    },
  ]

  return (
    <div>
      <ConnectedRouter history={history}>
        <Switch>

          <MainLayout>
            <Route exact path="/" render={() => (<Redirect to='/Home' />)} />
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key} exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics
                  })}
                />
              ))
            }
          </MainLayout>

        </Switch>

      </ConnectedRouter>
    </div>


  );
}

export default RouterConfig;

import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { FetchLaskut } from './components/FetchLaskut';
import { AddLasku } from './components/AddLasku';
import { EditLasku } from './components/EditLasku';
import { FetchFiles } from './components/FetchFiles';
import { EditFile } from './components/EditFile';
import { Haku } from './components/Haku';



import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            
            <AuthorizeRoute path='/fetch-laskut' component={FetchLaskut} />
            <Route path='/fetch-files' component={FetchFiles} />
            <Route path='/add-lasku' component={AddLasku} />
            
            <Route path='/laskut/haku/:laskuId' component={Haku}/>
            <Route path='/laskut/edit/:laskuId' component={EditLasku} />
            <Route path='/add-file' component={EditFile} />
            <Route path='/files/edit/:fileId' component={EditFile} />
       
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}

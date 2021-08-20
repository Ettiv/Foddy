import { Component } from 'react';
import {Route, Switch } from 'react-router-dom';

import Main from './components/main/main';
import LoginComponent from './components/loginComponent/loginComponent';
import AutfinticatedRoute from './components/authinticatedRoute/authinticatedRoute';
class App extends Component {
  render(){
    return(
      <div className="App">
          <Switch>
            <Route path='/index.html' exact component={LoginComponent} />
            <Route path='/' exact component={LoginComponent} />
            <Route path='/login' exact component={LoginComponent} />
            <AutfinticatedRoute role='ROLE_USER' path='/main' component={Main} />
          </Switch>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import HomeFlatList from './src/pages/HomeFlatList';
import Detail from './src/pages/Detail';
import InputTodo from './src/pages/InputTodo';


export default class App extends Component{
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar='true'>
          <Scene key="home" component={HomeFlatList} initial={true}/>
          <Scene key="detail" component={Detail} />
          <Scene key="input" component={InputTodo} />
        </Scene>
      </Router>
    );
  }
}


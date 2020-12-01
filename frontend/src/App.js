import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';


import './App.css';
import store from './store';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

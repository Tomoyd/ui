import React from 'react';
import logo from './logo.svg';
import './styles/normalize.less';
import './App.less';
import { Button } from './components/Button/Button';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button disabled href='//www.baidu.com'>
          hello world
        </Button>
      </header>
    </div>
  );
}

export default App;

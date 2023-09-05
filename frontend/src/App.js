
import { useEffect, useState } from 'react';

import Banner from './banner';
import './global.css'
import BoxTraducao from './boxTraducao';

function App() {
  
  return (
    <div className="App">
      <header>
        <Banner/>
      </header>
      <BoxTraducao/>
    </div>
  );
}

export default App;

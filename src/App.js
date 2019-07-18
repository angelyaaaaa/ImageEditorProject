import React, { useState } from 'react';
import Upload from './components/UploadArea';
import Display from './components/DisplayArea';

import './App.css';

const App = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })

    return (
        <div className="App">
            <Upload setPosition={setPosition}></Upload>
            <Display position={position}></Display>
        </div>
    );
}

export default App;

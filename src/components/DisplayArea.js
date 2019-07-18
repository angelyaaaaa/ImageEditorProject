import React from 'react';
import './DisplayArea.css';

const DisplayArea = ({ position }) => {
    return (
        <div className="display-area" id="display-area">
            <p>X: {position.x}</p>
            <p>Y: {position.y}</p>
            <p>Width: {position.width}</p>
            <p>Height: {position.height}</p>
        </div>
    );
}

export default DisplayArea;
import React, { useState, useEffect, useRef } from 'react';
import './UploadArea.css';


const WIDTH = 340;

const UploadArea = ({ setPosition }) => {
    const [hasUpload, setHasUpload] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [rect, setRect] = useState({
        startX: 0,
        startY: 0
    })
    const [picSrc, setPicSrc] = useState('https://cdn2.iconfinder.com/data/icons/circular-icons-line/82/Circular_Camera-512.png');
    const [picInfo, setPicInfo] = useState({
        height: '50px',
        width: '50px'
    });
    
    const handleDbClick = () => {
        document.querySelector('#file-uploader').click();
    }

    const handleChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (!uploadedFile) {
            return;
        }

        setHasUpload(true);
        const image = URL && URL.createObjectURL(uploadedFile);
        console.log('---- uploadedFile', uploadedFile);


        let uploadedImage = new Image();
        uploadedImage.src = image;
        uploadedImage.onload = () => {
            // console.log('---- width', uploadedImage.naturalWidth);
            // console.log('---- height', uploadedImage.naturalHeight);

            let imgWidth = uploadedImage.naturalWidth;
            let imgHeight = uploadedImage.naturalHeight;

            // set new ratio for pic
            if (imgWidth > WIDTH) {
                imgHeight = imgHeight * WIDTH / imgWidth;
                imgWidth = WIDTH;
            }

            setPicInfo({
                width: `${imgWidth}px`,
                height: `${imgHeight}px`,
            });
            setPicSrc(image);
            // canvasInit();
            
            
        }

    }

    const canvasRef = useRef(null);
    const UI = useRef(null);
    useEffect(() => {
        console.log('--- useEffect canvas', canvasRef);
        const ctx = canvasRef.current.getContext('2d');
    })

    const deleteButton = useRef(null);
    const handleDeleteButton = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = "#989396";
        ctx.fillRect(rect.startX, rect.startY, rect.rectW, rect.rectH);
    }


    const handleMouseDown = (e) => {
        // const UAAA = document.querySelector('#upload-area');

        setIsDragging(true);
        // record the start point
        const imageFrame = UI.current;
        
        // rect.startX = e.pageX - imageFrame.offsetLeft - 20;
        // rect.startY = e.pageY - imageFrame.offsetTop - 20;
        const a = e.pageX - imageFrame.offsetLeft;
        const b = e.pageY - imageFrame.offsetTop;
        setRect({
            startX: e.pageX - imageFrame.offsetLeft,
            startY: e.pageY - imageFrame.offsetTop,
            // startX: a,
            // startY: b,
        });

        setShowDeleteButton(false);

        // console.log('--- start to draw UI', UI);
        // console.log('--- start to draw imageFrame', imageFrame);
        // console.log('--- start to draw e.clientY', e.clientY);
        // console.log('--- start to draw e.pageX', e.pageX);
        // console.log('--- start to draw e.pageY', e.pageY);
        // console.log('--- start to draw e.screenY', e.screenY);
        console.log('--- start to draw imageFrame.offsetLeft', imageFrame.offsetLeft);
        console.log('--- start to draw imageFrame.offsetTop', imageFrame.offsetTop);
        console.log('--- start to draw canvasRef.current.offsetLeft', canvasRef.current.offsetLeft);
        console.log('--- start to draw canvasRef.current.offsetTop', canvasRef.current.offsetTop);
        console.log('--- start to draw rect.startX', a);
        console.log('--- start to draw rect.startY', b);
        console.log('=================================== ');

    }
    const handleMouseUp = (e) => {
        // console.log('--- stop draw');
        if (isDragging) {
            setShowDeleteButton(true);
        }
        setIsDragging(false);
        
    }
    const handleMouseMove = (e) => {
        // console.log('--- handleMouseMove isDragging', isDragging);
        // console.log('--- handleMouseMove rect', rect);
        if (isDragging) {
            const ctx = canvasRef.current.getContext('2d');
            const imageFrame = UI.current;
            // console.log('--- handleMouseMove ctx', ctx);
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            // ctx.clearRect(0, 0, 493, 360);
            ctx.setLineDash([6]);
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            // ctx.fillStyle = "#989396";
            // ctx.fillStyle = "green";
            // ctx.fillRect(rect.startX, rect.startY, 10, 10);

            const rectW = (e.pageX - imageFrame.offsetLeft) - rect.startX;
            const rectH = (e.pageY - imageFrame.offsetTop) - rect.startY;
            // const rectW = 10 - rect.startX;
            // const rectH = 20 - rect.startY;
            // console.log('--- handleMouseMove rect.startX', rect.startX);
            // console.log('--- handleMouseMove rect.startY', rect.startY);
            console.log('--- handleMouseMove rectW', rectW);
            console.log('--- handleMouseMove rectH', rectH);
            // console.log('********************** ');
            // ctx.strokeRect(rect.startX, rect.startY, rectW, rectH);
            ctx.strokeRect(rect.startX, rect.startY, rectW, rectH);
            setRect({
                ...rect,
                rectW,
                rectH
            });
            setPosition({
                x: rect.startX,
                y: rect.startY,
                width: rectW,
                height: rectH
            });
        }
    }
    
    return (
        <div className="upload-area" id="upload-area">
            <div className="upload-header">
                <div className="upload-user"></div>
            </div>
            <div className={`upload-image ${hasUpload ? 'after-upload' : 'before-upload'}`} 
                onDoubleClick={handleDbClick}
                id="upload-image"
                ref={UI}
            >
                <img id="preview-image" src={picSrc} alt="" style={picInfo}/>
                <canvas 
                    id="canvas" 
                    ref={canvasRef}
                    className={hasUpload ? '' : 'hidden'}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    width={+picInfo.width.replace('px', '')}
                    height={+picInfo.height.replace('px', '')}
                />
                <button 
                    ref={deleteButton} 
                    className="delete-button"
                    style={{ top: rect.startY, left: (rect.startX + rect.rectW), display: showDeleteButton ? 'flex' : 'none'}}
                    onClick={handleDeleteButton}
                >
                    <img src="https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180817288/107942124-trash-vector-icon-isolated-on-transparent-background-trash-logo-concept.jpg" alt=""/>
                </button>
            </div>
            <input type="file" className="hidden" id="file-uploader" accept="image/*" multiple="multiple" onChange={handleChange}/>
        </div>
    );
}

export default UploadArea;
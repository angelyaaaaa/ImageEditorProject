import React, { useState} from 'react';
import './UploadArea.css';


const WIDTH = 340;
const UploadArea = () => {
    const [hasUpload, setHasUpload] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [picSrc, setPicSrc] = useState('https://cdn2.iconfinder.com/data/icons/circular-icons-line/82/Circular_Camera-512.png');
    const [picInfo, setPicInfo] = useState({
        height: '50px',
        width: '50px'
    })
    const handleClick = () => {
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

            
            
        }

    }

    const canvasInit = () => {
        let canvas = document.querySelector('#upload-image');
        let ctx = canvas.getContext('2d');
        
        


        const draw = () => {
            // ctx.setLineDash([6]);
            // ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
            ctx.fillStyle = "green";
            ctx.fillRect(10, 10, 100, 100);
        }
        const handleMouseDown = (e) => {
            console.log('--- start to draw');
        }
        const handleMouseUp = (e) => {
            console.log('--- stop draw');
        }
        const handleMouseMove = (e) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
        }


        canvas.addEventListener('mousedown', handleMouseDown, false);
        canvas.addEventListener('mouseup', handleMouseUp, false);
        canvas.addEventListener('mousemove', handleMouseMove, false);
    }
    
    return (
        <div className="upload-area">
            <div className="upload-header">
                <div className="upload-user"></div>
            </div>
            <div className={`upload-image ${hasUpload ? 'after-upload' : 'before-upload'}`} 
                onClick={handleClick}
                id="upload-image"
            >
                <img id="preview-image" src={picSrc} alt="" style={picInfo}/>
            </div>
            <input type="file" id="file-uploader" accept="image/*" multiple="multiple" onChange={handleChange}/>
        </div>
    );
}

export default UploadArea;
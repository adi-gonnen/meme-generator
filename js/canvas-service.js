'use strict'

console.log('canvas');

// var gImgsTest = [{ id: 1, url: 'img/2.jpg', keywords: ['happy'] }];

var gMemeTest = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
};

//TODO: init() function on canvas - when user choose a img
var gCanvas;
var gCtx;

function drawImgOnCanvas(img) {
    console.log('img', img);
    var imgCanvas = new Image();
    console.log('imgCanvas', imgCanvas);
    imgCanvas.src = img.url;
    imgCanvas.onload = function () {
        drawImage(this);
    };
    //TODO: seprate return to diffrent func
    return { width: imgCanvas.width, height: imgCanvas.height };
}


function drawImage(imgCanvas) {
    var x = 0;//TODO: CHECK THE REAL LOCATION;
    var y = 0;//TODO: CHECK THE REAL LOCATION;

    gCtx.drawImage(imgCanvas, x, y);
    // gCtx.drawImage(imgCanvas, x, y, imgCanvas.width, imgCanvas.height);

    //MAYBE: not nessesry!
    // var imageData = gCtx.getImageData(x, y, imgCanvas.width, imgCanvas.height);
    // var data = imageData.data;
    // overwrite original image
    // gCtx.putImageData(imageData, x, y);
}


//function renderCanvasSize = get the size of image and render according it
function renderCanvasSize(imgDimsObj) {
    gCanvas.width = imgDimsObj.width;
    gCanvas.height = imgDimsObj.height;
    gCtx.fillStyle = 'lightblue';
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
}





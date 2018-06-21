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

function drawCanvas(img) {
    var ctx = canvas.getContext('2d');
    var x = 0;
    var y = 0;
    // var width = 300;
    // var height = 400;
    var imageObj = new Image();
    
    imageObj.onload = function() {
      ctx.drawImage(imageObj, x, y);
    };
    // var imageUrl = img.url;
    // ctx.setBackgroundImage(imageUrl);
    imageObj.src =  img.url;

}

function getImgSize(imgDimsObj) {
    
}

// function renderCanvasSize = get the size of image and render according it-
function renderCanvasSize(imgDimsObj) {
    gCanvas.width = 600;
    gCanvas.height = 450;
    var ratio = imgDimsObj.width / imgDimsObj.height;  
    console.log('ratio', ratio);
    if (imgDimsObj.width > imgDimsObj.height) {
        if (imgDimsObj.width > gCanvas.width) {
            // console.log('width');
            // console.log('imgDimsObj.width', imgDimsObj.width);
            imgDimsObj.height = gCanvas.width * (1 / ratio);
            // console.log('imgDimsObj.height', imgDimsObj.height);
            gCanvas.height = imgDimsObj.height;
            // console.log('gCanvas.height', gCanvas.height);
        } 
    } else {
        if (imgDimsObj.height > gCanvas.height) {
            // console.log('height');
            gCanvas.height = gCanvas.width;
            // console.log('imgDimsObj.height', imgDimsObj.height);
            imgDimsObj.width = gCanvas.height * ratio;
            // console.log('imgDimsObj.width', imgDimsObj.width);
            gCanvas.width = imgDimsObj.width;
            // console.log('gCanvas.width', gCanvas.width);

            // console.log('gCanvas.height', gCanvas.height);
        } 
    }

    // gCanvas.width = imgDimsObj.width;
    // gCanvas.height = imgDimsObj.height;
    gCtx.fillStyle = 'lightblue';
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);

       // gCanvas.width = 450;
    // gCanvas.height = 600;
    // if (imgDimsObj.width > imgDimsObj.height)
}





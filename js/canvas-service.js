'use strict'

console.log('canvas');

var gImgsTest = [{ id: 1, url: 'img/2.jpg', keywords: ['happy'] }];

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
var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d');



function initCanvas(img) {
    var imgDimsObj = drawImgOnCanvas(img);
    renderCanvasSize(imgDimsObj);
    var txt = onTxtInsert();
    renderTxtCanvas(txt);
}

//TODO: get the gImgs[i].url - and update the function
function drawImgOnCanvas(img) {
    console.log('img', img);
    var imgCanvas = new Image();
    console.log('imgCanvas', imgCanvas);
    //TODO: get the gImgs[i].url - and update the function
    // img.src = 'img/meme1.jpg';
    // img.src = 'img/2.jpg';
    imgCanvas.src = img.url;
    imgCanvas.onload = function () {
        drawImage(this);
    };
    //TODO: seprate returm to diffrent func
    return {width: imgCanvas.width, height: imgCanvas.height};
}



// getImgWidthHeight(gImgsTest[0]);


// TODO: NOT WORKING!! according URL get width and height of the img
// function getImgWidthHeight(imageObj) {
//     var imgUrl = '2.jpg';
//     console.log('imgUrl.width', imgUrl.width);

//     // imgUrl.width;
// } 



function drawImage(imgCanvas) {
    var x = 0;//TODO: CHECK THE REAL LOCATION;
    var y = 0;//TODO: CHECK THE REAL LOCATION;

    gCtx.drawImage(imgCanvas, x, y);

    // var imageData = gCtx.getImageData(x, y, imgCanvas.width, imgCanvas.height);
    var data = imageData.data;

    // overwrite original image
    gCtx.putImageData(imageData, x, y);
}
// }

//render img 
//TODO: get url and then draw on canvas
// function drawImgOnCanvas() {
//     // gImgsTest[0].url = 
//     var img = new Image();
//     img.src = 'img/2.jpg';
//     img.onload = function() {
//         context.drawImgOnCanvas(img, 0, 0, canvas.width, canvas.height);
//     }
// }


//function renderCanvasSize = get the size of image and render according it
//TODO: change the width & height according img size
function renderCanvasSize(imgDimsObj) {
    gCanvas.width = imgDimsObj.width;
    gCanvas.height = imgDimsObj.height;
    gCtx.fillStyle = 'lightblue';
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
}




//get input text from user and draw in canvas
// function drawTxtInCanvas(elEnteredTxt) {
function onTxtInsert() {
    var elLineInput = document.querySelector('.line-input');
    var txt = elLineInput.value;
    console.log('elLineInput', txt);
    return txt;
}

//render txt in canvas
function renderTxtCanvas(txt) {

}


//TODO: function get URL by Id
function getImgById() {

}


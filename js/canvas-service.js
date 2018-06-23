'use strict'

var gCount = 0;
//TODO: update all the properties - according to btns! and object positions
var gMeme = {
    img: {},
    selectedImgId: null,
    width: null,
    height: null,
    txts: [
        {
            line: '',
            font: 'Impact',
            order: gCount++,
            size: 25,
            align: 'left',
            color: '#ffffff',
            textShadow: false,
            textShadowWhite: false,
            textShadowBlack: false,
            posX: 80,
            posY: 60
        }]
};

var gCanvas;
var gCtx;

// var MEME_KEY = 'currMeme';

// var gImgsTest = [{ id: 1, url: 'img/2.jpg', keywords: ['happy'] }];

function addLine() {
    if (gMeme.txts.length === 3) return;
    var newLine = creatLine();
    var txts = gMeme.txts;
    txts.push(newLine);
    renderTxtLine(txts);
}

function creatLine() {
    var currSize;
    var currColor;
    var locate = gMeme.txts.indexOf(); //check
    if (gMeme.txts.length > 0) {
        currSize = gMeme.txts[0].size;
        currColor = gMeme.txts[0].color;
    }  else {
        currSize = 25;
    }   currColor = '#ffffff';
    return {
        line: '',
        font: 'Impact',
        order: gCount++,
        size: currSize,
        align: 'left',
        color: currColor,
        textShadow: false,
        posX: 80,
        posY: 60
    }
}

//TODO: init() function on canvas - when user choose a img
//@@@name changed
function gImgIdUpdate() {
    var img = getCurrImg();
    //update the img.id
    // console.log('img.idAAA', img.id);
    gMeme.selectedImgId = img.id;
    // console.log('gmeme  AAAA', gMeme);
    // console.log('gMeme.selectedImgId', gMeme.selectedImgId);
}

//@@@name changed
function renderCanvas() {
    var img = getCurrImg();
    // console.log('img', img);
    var imgCanvas = new Image();
    // console.log('imgCanvas', imgCanvas);
    imgCanvas.src = img.url;
    imgCanvas.onload = function () {
        drawCanvas(this);
    };
    //TODO: seprate return to diffrent func
    return { width: imgCanvas.width, height: imgCanvas.height };
}

//@@@name changed
function drawCanvas(imgCanvas) {
    var x = 0;//TODO: CHECK THE REAL LOCATION;
    var y = 0;//TODO: CHECK THE REAL LOCATION;
    // console.log('width: ', imgCanvas.width);
    gCtx.drawImage(imgCanvas, x, y, gCanvas.width, gCanvas.height);
    gMeme.txts.forEach(function (txt) {
        renderTxt(txt);
        })
    //MAYBE: not nessesry!
    // var imageData = gCtx.getImageData(x, y, imgCanvas.width, imgCanvas.height);
    // var data = imageData.data;
    // overwrite original image
    // gCtx.putImageData(imageData, x, y);
}

//@@@this function not in use
function drawImgCanvas(img) {
    // gCtx = gCanvas.getContext('2d');
    var x = 0;
    var y = 0;
    // var width = 300;
    // var height = 400;
    var imageObj = new Image();

    imageObj.onload = function () {
        gCtx.drawImage(imageObj, x, y);
    };
    // var imageUrl = img.url;
    // ctx.setBackgroundImage(imageUrl);
    imageObj.src = img.url;

}

//check if need to cancel
function getImgSize(imgDimsObj) {

}

function renderCanvasSize(imgDimsObj) {
    gCanvas.width = 510;
    gCanvas.height = 405;
    var ratio = imgDimsObj.width / imgDimsObj.height;
    // console.log('ratio', ratio);
    if (imgDimsObj.width > imgDimsObj.height) {
        if (imgDimsObj.width > gCanvas.width) {
            // console.log('width');
            // console.log('imgDimsObj.width', imgDimsObj.width);
            imgDimsObj.height = gCanvas.width * (1 / ratio);
            // console.log('imgDimsObj.height', imgDimsObj.height);
            gCanvas.height = imgDimsObj.height;
            // console.log('gCanvas.height', gCanvas.height);
        } else {
            var widthRatio = gCanvas.width / imgDimsObj.width;
            imgDimsObj.width = gCanvas.width;
            imgDimsObj.height *= widthRatio;
            // console.log('imgDimsObj.height (wide)', imgDimsObj.height);
            // console.log('imgDimsObj.width (wide)', imgDimsObj.width);
        }
    } else {
        if (imgDimsObj.height > gCanvas.height) {
            gCanvas.height = gCanvas.width;
            // console.log('imgDimsObj.height', imgDimsObj.height);
            imgDimsObj.width = gCanvas.height * ratio;
            // console.log('imgDimsObj.width', imgDimsObj.width);
            gCanvas.width = imgDimsObj.width;
            // console.log('gCanvas.width', gCanvas.width);

            // console.log('gCanvas.height', gCanvas.height);
        } else {
            var heightRatio = gCanvas.height / imgDimsObj.height;
            imgDimsObj.height = gCanvas.height;
            imgDimsObj.width *= heightRatio;
            // console.log('imgDimsObj.height (long)', imgDimsObj.height);
            // console.log('imgDimsObj.width(long)', imgDimsObj.width);
        }
    }

    // gCanvas.width = imgDimsObj.width;
    // gCanvas.height = imgDimsObj.height;
    gCtx.fillStyle = 'rgb(239, 245, 243)';
    gCtx.fillRect(0, 0, imgDimsObj.width, imgDimsObj.height);
    // gCtx.drawImage(imageObj, x, y, imgDimsObj.width, imgDimsObj.height);
    // gCtx.fillRect(0, 0, 400, 600);
    gMeme.width = imgDimsObj.width;
    gMeme.height = imgDimsObj.height;

}

// function saveCurrMeme(gMeme) {
//     saveToStorage(MEME_KEY, gMeme);
// }

// function getCurrMeme() {
//     var currMeme = loadFromStorage(MEME_KEY);
//     return currMeme;
// }


function txtShadow(color) {
    // console.log('color', color);
    //TODO: for txts array
    if (color === 'white') {
        gMeme.txts[0].textShadow = true;
        gMeme.txts[0].textShadowWhite = true;
        gMeme.txts[0].textShadowBlack = false;
    } else if (color === 'black') {
        gMeme.txts[0].textShadow = true;
        gMeme.txts[0].textShadowWhite = false;
        gMeme.txts[0].textShadowBlack = true;
    } else if (color === 'none') {
        gMeme.txts[0].textShadow = false;
        gMeme.txts[0].textShadowWhite = false;
        gMeme.txts[0].textShadowBlack = false;
        onTxtShadowColor('none');
    }
}
// console.log('try txt: ', getTxtById(0));

function getTxtById(id) {
    for (var i = 0; i < gMeme.txts.length; i++) {
        var txt = gMeme.txts[i];
        console.log('txt@ ', txt, 'id', id);
        if (txt.order === +id) {
            return txt;
        }
    }
}
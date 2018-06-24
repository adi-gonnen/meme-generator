'use strict'

var gCanvas;
var gCtx;
var gMeme = {
    img: {},
    selectedImgId: null,
    width: null,
    height: null,
    size: 25,
    align: 'left',
    color: '#ffffff',
    textShadow: false,
    textShadowWhite: false,
    textShadowBlack: false,
    font: 'Impact',
    txts: [
        {
            line: '',
            order: 0,
            posX: 80,
            posY: 60
        }]
};

function renderCanvas() {
    var img = getCurrImg();
    // console.log('img', img);
    var imgCanvas = new Image();
    // console.log('imgCanvas', imgCanvas);
    imgCanvas.src = img.url;
    imgCanvas.onload = function () {
        drawCanvas(this);
        gMeme.txts.forEach(function (txt, idx) {
            console.log('idx!!', idx);
            renderTxt(txt, idx);
            })
    };
    return { width: imgCanvas.width, height: imgCanvas.height };
}

function renderTxt(txt, idx) {
    var x = txt.posX;
    // console.log('idx: ', idx);
    var y = txt.posY;
    if (idx === 1) y = 230;      
    if (idx === 2) y = 380;
    console.log('txt:::', txt, txt.line, txt.order);
    
    var txtSize = `${gMeme.size}px`;
    var txtFont = gMeme.font;
    // console.log('txtFont: ' ,txtFont);
    
    if (gCanvas.getContext) {
        gCtx.font = `${txtSize} ${txtFont}`;  
        // console.log('gCtx.font: ', gCtx.font);
        var currColor = gMeme.color 
        gCtx.fillStyle = currColor;  
        // console.log('ctx.font: ', gCtx.font);
        // console.log('gMeme.txts[0][color]--', gMeme.txts[0].color);
        gCtx.fillText(txt.line, x, y);
        // console.log('txt: ', txt);
        gCtx.save();
    }
}

function drawCanvas(imgCanvas) {
    var x = 0;//TODO: CHECK THE REAL LOCATION;
    var y = 0;//TODO: CHECK THE REAL LOCATION;
    // console.log('width: ', imgCanvas.width);
    gCtx.drawImage(imgCanvas, x, y, gCanvas.width, gCanvas.height);
    //MAYBE: not nessesry!
    // var imageData = gCtx.getImageData(x, y, imgCanvas.width, imgCanvas.height);
    // var data = imageData.data;
    // overwrite original image
    // gCtx.putImageData(imageData, x, y);
}

function renderCanvasSize(imgDimsObj) {
    gCanvas.width = 540;
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

function addLine() {
    if (gMeme.txts.length === 3) return;
    var nextId = 1;
    if (gMeme.txts.length === 2) nextId = 2;        //line order
    var newLine = creatLine(nextId);
    var txts = gMeme.txts;
    txts.push(newLine);
    renderTxtLine(txts);
}

function creatLine(num) {
    var locate = gMeme.txts.indexOf(); //check
    return {
        line: '',
        order: num,
        posX: 80,
        posY: 60
    }
}

function getTxtById(id) {
    for (var i = 0; i < gMeme.txts.length; i++) {
        var txt = gMeme.txts[i];
        console.log('txt@ ', txt, 'id', id);
        if (txt.order === +id) {
            return txt;
        }
    }
}

//consider cancel@@
// function gImgIdUpdate() {
//     var img = getCurrImg();
//     gMeme.selectedImgId = img.id;
// }

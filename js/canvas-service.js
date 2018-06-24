'use strict'

var gCanvas;
var gCtx;
var gMeme;

function createMeme() {
    return {
        width: null,
        height: null,
        size: 30,
        align: 'left',
        color: '#ffffff',
        textShadowWhite: false,
        textShadowBlack: true,
        font: 'Impact',
        txts: [
            {
                line: '',
                order: 0,
                posX: 80,
                posY: 60
            }]
        }
}

function renderCanvas() {
    var img = getCurrImg();
    var imgCanvas = new Image();
    imgCanvas.src = img.url;
    imgCanvas.onload = function () {
        drawCanvas(this);
        gMeme.txts.forEach(function (txt, idx) {
            renderTxt(txt, idx);
        })
    };
    return { width: imgCanvas.width, height: imgCanvas.height };
}

function renderTxt(txt, idx) {
    var x = txt.posX;
    var y = txt.posY;
    var txtSize = `${gMeme.size}px`;
    var fontSize = `${gMeme.size}px`;
    var txtFont = gMeme.font;
    if (gCanvas.getContext) {
        gCtx.font = `${txtSize} ${txtFont}`;
        gCtx.font = `${fontSize} ${txtFont}`;  
        var currColor = gMeme.color
        gCtx.fillStyle = currColor;
        var shadowColor = '#000000';
        if (gMeme.textShadowBlack === false) {
            if (gMeme.textShadowWhite === true) {
                shadowColor = '#ffffff';
            } else shadowColor = null;  
        }
        gCtx.strokeStyle = shadowColor;
        gCtx.strokeText(txt.line,x, y);
        gCtx.fillText(txt.line, x, y);
        gCtx.save();
    }
}

function locateLine() {
    var y;
    gMeme.txts.forEach(function (txt, idx) {
        if (idx === 0) y = 50;
        else if (idx === 1) y = gCanvas.height / 2;
        else y = gCanvas.height - 50;
        txt.posY = y;
    })
}

function drawCanvas(imgCanvas) {
    var x = 0;
    var y = 0;
    gCtx.drawImage(imgCanvas, x, y, gCanvas.width, gCanvas.height);
}

function renderCanvasSize(imgDimsObj) {
    gCanvas.width = 540;
    gCanvas.height = 405;
    var ratio = imgDimsObj.width / imgDimsObj.height;
    if (imgDimsObj.width > imgDimsObj.height) {
        if (imgDimsObj.width > gCanvas.width) {
            imgDimsObj.height = gCanvas.width * (1 / ratio);
            gCanvas.height = imgDimsObj.height;
        } else {
            var widthRatio = gCanvas.width / imgDimsObj.width;
            imgDimsObj.width = gCanvas.width;
            imgDimsObj.height *= widthRatio;
        }
    } else {
        if (imgDimsObj.height > gCanvas.height) {
            gCanvas.height = gCanvas.width;
            imgDimsObj.width = gCanvas.height * ratio;
            gCanvas.width = imgDimsObj.width;
        } else {
            var heightRatio = gCanvas.height / imgDimsObj.height;
            imgDimsObj.height = gCanvas.height;
            imgDimsObj.width *= heightRatio;
        }
    }
    gCtx.fillStyle = 'rgb(239, 245, 243)';
    gCtx.fillRect(0, 0, imgDimsObj.width, imgDimsObj.height);
    gMeme.width = imgDimsObj.width;
    gMeme.height = imgDimsObj.height;
}

function txtShadow(color) {
    if (color === '#ffffff') {
        if (!gMeme.textShadowWhite) {
            gMeme.textShadowWhite = true;
        }
        else {
            gMeme.textShadowWhite = false;
        }
        gMeme.textShadowBlack = false;
        renderCanvas();
    } else if (color === '#000000') {
        if (!gMeme.textShadowBlack) {
            gMeme.textShadowBlack = true;
        }
        else {
            gMeme.textShadowBlack = false;
        }
        gMeme.textShadowWhite = false;
        renderCanvas();
    }
}

function txtAlign(alignValue) {
    if (alignValue === 'left') {
        gMeme.align = 'left';
    }
    if (alignValue === 'center') {
        gMeme.align = 'center';
    }
    if (alignValue === 'right') {
        gMeme.align = 'right';
    }

    updatePosX();
}

function updatePosX() {
    gMeme.txts.forEach(function (txt, idx) {
        if (gMeme.align === 'left') txt.posX = 10;
        if (gMeme.align === 'right') txt.posX = gCanvas.width - 80;
        if (gMeme.align === 'center') txt.posX = gCanvas.width / 2 - 40;
    })
    renderCanvas();  
}

function addLine() {
    if (gMeme.txts.length === 3) {
        addClassBlockBtn();
        return;
    }
    var nextId = 1;
    var posY = 230
    if (gMeme.txts.length === 2) {
        nextId = 2;                     //line order
        posY = 380
    }
    var newLine = creatLine(nextId, posY);
    var txts = gMeme.txts;
    txts.push(newLine);
    locateLine();
    
    renderTxtLine(txts);
}

function creatLine(num, y) {
    return {
        line: '',
        order: num,
        posX: 80,
        posY: y
    }
}

function getTxtById(id) {
    for (var i = 0; i < gMeme.txts.length; i++) {
        var txt = gMeme.txts[i];
        if (txt.order === +id) {
            return txt;
        }
    }
}

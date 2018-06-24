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
    textShadowWhite: 'none',
    textShadowBlack: 'none',
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
    console.log('txt.posX: ', txt.posX);
    var y = txt.posY;
    if (idx === 1) y = 230;
    if (idx === 2) y = 380;
    console.log('txt:::', txt, txt.line, txt.order);

    var txtSize = `${gMeme.size}px`;
    // var y = (gMeme.height - 380);
    var fontSize = `${gMeme.size}px`;
    var txtFont = gMeme.font;
    // console.log('txtFont: ' ,txtFont);

    // var txtAlign = gMeme.align;

    // if (colorValue === '#ffffff') {

    //     txt.line.style.textShadow = '3px 1px 2px #ffffff';
    //     txtShadow('white');
    //     // renderCanvas();
    // } else if (colorValue === '#000000') {
    //     txt.line.style.textShadow = '4px 4px 1px #000000';
    //     txtShadow('black');
    //     // renderCanvas();
    // }


    // ['3px', '1px', '2px', '#ffffff'];



    if (gCanvas.getContext) {
        gCtx.font = `${txtSize} ${txtFont}`;
        gCtx.font = `${fontSize} ${txtFont}`;  
        // console.log('gCtx.font: ', gCtx.font);
        var currColor = gMeme.color
        gCtx.fillStyle = currColor;

        // gCtx.textAlign = txtAlign;



        if (gMeme.textShadowWhite !== 'none') {
            gCtx.shadowColor = gMeme.textShadowWhite[3];
            gCtx.shadowOffsetX = gMeme.textShadowWhite[0];
            gCtx.shadowOffsetY = gMeme.textShadowWhite[1];
            gCtx.shadowBlur = gMeme.textShadowWhite[2];
        } else if (gMeme.textShadowBlack !== 'none') {
            gCtx.shadowColor = gMeme.textShadowBlack[3];
            gCtx.shadowOffsetX = gMeme.textShadowBlack[0];
            gCtx.shadowOffsetY = gMeme.textShadowBlack[1];
            gCtx.shadowBlur = gMeme.textShadowBlack[2];
        } else if (gMeme.textShadowBlack === 'none') {
            gCtx.shadowColor = '';
            gCtx.shadowOffsetX = '';
            gCtx.shadowOffsetY = '';
            gCtx.shadowBlur = '';
        }

        // console.log('ctx.font: ', gCtx.font);
        // console.log('gMeme.txts[0][color]--', gMeme.txts[0].color);
        console.log('txt.posX: ', txt.posX);
        gCtx.fillText(txt.line, x, y);
        console.log('txt.posX: ', txt.posX);
        // console.log('txt: ', txt);
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
    // debugger;
    console.log('color');
    if (color === '#ffffff') {
        console.log('white');
        if (gMeme.textShadowWhite === 'none') {
            gMeme.textShadowWhite = ['3', '1', '1', '#ffffff'];
        }
        else {
            gMeme.textShadowWhite = 'none';
        }
        gMeme.textShadowBlack = 'none';
        renderCanvas();
    } else if (color === '#000000') {
        console.log('black');
        if (gMeme.textShadowBlack === 'none') {
            gMeme.textShadowBlack = ['4', '4', '1', '#000000'];
        }
        else {
            gMeme.textShadowBlack = 'none';
        }
        gMeme.textShadowWhite = 'none';
        renderCanvas();
    }

}

function txtAlign(alignValue) {
    console.log('onTxtAlign');
    if (alignValue === 'left') {
        gMeme.align = 'left';
        console.log('left', alignValue);
    }
    if (alignValue === 'center') {
        gMeme.align = 'center';
        console.log('center', alignValue);
    }
    if (alignValue === 'right') {
        gMeme.align = 'right';
        console.log('right', alignValue);
    }

    updatePosX();
}

function updatePosX() {
    gMeme.txts.forEach(function (txt, idx) {
        console.log('idx!!', idx);
        if (gMeme.align === 'left') txt.posX = 10;
        if (gMeme.align === 'right') txt.posX = gCanvas.width - 80;
        if (gMeme.align === 'center') txt.posX = gCanvas.width / 2 - 40;
    })
    renderCanvas();  
}

// console.log('left 1', txtAlign);
// if (txtAlign === 'left') {
//     console.log('left 1', txtAlign);
//     gMeme.txts.forEach(function (txt, idx) {
//         console.log('idx!!', idx);
//         txt.posX = 10;
//     })

//     console.log('left 2', txtAlign);
// }
// else if (txtAlign === 'right') {
//     console.log('right 1', txtAlign);
//     // gCtx.textAlign = 'right';
//     gMeme.txts.forEach(function (txt, idx) {
//         console.log('idx!!', idx);
//         txt.posX = gCanvas.width - 10;
//     })
//     console.log('right 2', txtAlign);
// }
// else if (txtAlign === 'center') {
//     console.log('center 1', txtAlign);
//     // gCtx.textAlign = 'center';
//     gMeme.txts.forEach(function (txt, idx) {
//         console.log('idx!!', idx);
//         txt.posX = gCanvas.width / 2;
//     })
//     console.log('center 2', txtAlign);
// }

// gMeme.txts.forEach(function (txt, idx) {
//     console.log('idx!!', idx);
//     if (colorValue === '#ffffff') {

//         txt.line.style.textShadow = '3px 1px 2px #ffffff';
//         txtShadow('white');
//         // renderCanvas();
//     } else if (colorValue === '#000000') {
//         txt.line.style.textShadow = '4px 4px 1px #000000';
//         txtShadow('black');
//         // renderCanvas();
//     } else if (colorValue === 'none') {
//         txt.line.style.textShadow = 'none';
//         // renderCanvas();
//     }
//     renderTxt(txt, idx);
//     })
// if (color === 'white') {
//     console.log('white');
//     if (!elTextLabel.textShadowWhite) {
//         elTextLabel.textShadowWhite = true;
//         console.log('white true', elTextLabel.textShadowWhite);
//     }
//     else {
//         elTextLabel.textShadowWhite = false;
//         console.log('white false', elTextLabel.textShadowWhite);
//         onTxtShadowColor('none');
//     }        
// } else if (color === 'black') {
//     console.log('black');
//     if (!elTextLabel.textShadowBlack) {
//         elTextLabel.textShadowBlack = true;
//         console.log('black true', elTextLabel.textShadowBlack);
//     }
//     else {
//         elTextLabel.textShadowBlack = false;
//         console.log('black false', elTextLabel.textShadowBlack);
//         onTxtShadowColor('none');
//     }
// }

// console.log('try txt: ', getTxtById(0));

// function 

function addLine() {
    if (gMeme.txts.length === 3) {

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
    console.log('new line: ', gMeme.txts);
    
    renderTxtLine(txts);
}

function creatLine(num, y) {
    // var locate = gMeme.txts.indexOf(); //check
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

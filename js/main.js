'use strict'

function renderGallery(imgs) {
    // var imgs = filterImgs(gImgs);
    imgs = getImgsForDisplay();

    var strHtml = '';
    imgs.forEach(function (img, idx) {
        strHtml += `<img id="${img.id}" class="item-img" onclick="selectImg(this)" style="background-image: url('../${img.url}')"></img>\n`
    });
    document.querySelector('.gallery').innerHTML = strHtml;
    // console.log(strHtml);
}

function searchImg() {
    renderGallery();
}

function filterImgs(imgs) {
    var userSearch = document.getElementById("search").value;
    if (userSearch === '') return imgs;
    else return imgs.filter(function (img) {
        return img.keywords.some(function (keyword) {
            return keyword.substring(0, userSearch.length) === userSearch;
        });
    });
}

function getImgsForDisplay() {
    var imgs = [];
    imgs = filterImgs(gImgs)
    return imgs;
}

function toggleGallery() {
    var elCanvas = document.querySelector('.container-canvas-page');
    elCanvas.classList.toggle('hide');
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hide');
    var elSearch = document.querySelector('.filter');
    elSearch.classList.toggle('hide');
}

// CANVAS

function backToGallery() {
    toggleGallery();
    // var img = getCurrImg();
    // initCanvas();
    // renderCanvas(img);
}

function initCanvas(img) {
    gImgIdUpdate();
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    var imgDimsObj = renderCanvas(img);
    renderCanvasSize(imgDimsObj);
    var txts = gMeme.txts;
    renderTxtLine(txts)
    // console.log('txts: ', txts);
    
    // var txt = onTxtInsert();
    // renderTxtCanvas(txt);
}

// function initCanvas() {
//     gCanvas = document.querySelector('.canvas');
//     gCtx = gCanvas.getContext('2d');
// }
// function renderCanvas(img) {
//     gMemeIdUpdate();
//     var imgDimsObj = drawImgOnCanvas(img);
//     renderCanvasSize(imgDimsObj);
//     var txts = gMeme.txts;
//     renderTxtLine(txts)
//  }

// function renderMeme() {
//     var img = getCurrImg();
//     // console.log('currImg--', currImg);
//     gMeme.txts.forEach(function (txt) {
//         locateTxt(txt);
//     })
//     // initCanvas(img);
// }

function onTxtInsert(elLine) {
    if (elLine.value) {
        var idx = elLine.id;
        // console.log('idx! ', idx);
        gMeme.txts[idx].line = elLine.value;
        var txt = getTxtById(+idx)
        var img = getCurrImg();
        // console.log('txt! ', txt);
        renderTxt(txt);
    } 
}

// ******************text
//get DOM txt
function getTxtElement(pos) {
    //TODO: change the selector to txt on canvas
    //TODO: RENDER CANVAS AND CLEAR
    // var elTextLabel = document.querySelector('.textlabel');
    //NOT FINISH!!!!
    var elTextLabel = document.querySelector(`.line-input-${pos}`);
    var elTextLabel = document.querySelector('.line-input-bottom');
    return elTextLabel;
}

//***********text */
// function updateFontSizeOnEl(elTextLabel, updatedFontSize) {
//     // console.log('updatedFontSize-new !!-', updatedFontSize);
//     //TODO: change according to txt array
//     gMeme.txts[0].size = updatedFontSize;
//     gMeme.txts[1].size = updatedFontSize;
//     console.log('gMeme.txts[0].size-new !!-', gMeme.txts[0].size);
//     console.log('gMeme-after updateFontSizeOnEl', gMeme);
//     // console.log('gMeme.txts[0].size-new !!-', gMeme.txts[0].size);
//     elTextLabel.style.fontSize = updatedFontSize + 'px';
// }

//get current font size
// function getCurrFontSize(elTextLabel) {
//     console.log('elTextLabel', elTextLabel);

//     // debugger;
//     var fontSizeTxt = window.getComputedStyle(elTextLabel, null).getPropertyValue('font-size');
//     var fontSize = parseFloat(fontSizeTxt);
//     return fontSize;
// }

// function updateFontSizeValue(elTextLabel, currFontSize, diff) {
//     var fontSizeTxt = elTextLabel.style.fontSize;
//     fontSizeTxt = (currFontSize + diff);
//     var updatedFontSize = parseFloat(fontSizeTxt);
//     return updatedFontSize;
// }

//***************text */
// function onIncreaseSize() {
//     // console.log('gMeme.txts[0].size onIncreaseSize', gMeme.txts[0].size);
//     // console.log('gMeme.txts[1].size onIncreaseSize', gMeme.txts[1].size);

//     // debugger;
//     clearCanvas();
//     onUpdateFontSize(1);
// }

// function onDecreaseSize() {
//     onUpdateFontSize(-1);
// }

function onChangeSize(diff) {
    clearCanvas();
    var img = getCurrImg();
    gMeme.txts.forEach(function (txt) {
        txt.size += (diff * 3);
        // console.log('txt: ', txt);
        // console.log('txt.size: ', txt.size);
        // console.log('txt.line: ', txt.line);
    })
    renderCanvas(img);
}

//get color-
function getColorValue() {
    var elInputColor = document.querySelector('#colorValue').value;
    // console.log('colorValue-??--', colorValue);
    // console.log('elInputColor-??--', elInputColor);
    return elInputColor;
}

//change color
function changeTxtColor() {
    // debugger;
    clearCanvas();
    var img = getCurrImg();
    //TODO: change element - to txt element on canvas
    // var elTxt = document.querySelector('.txt-container .textlabel');
    // console.log('elTxt--', elTxt);
    // elTxt.style.color = colorValue;
    // var currColor = getColorValue(); 
    // gCtx.fillStyle = currColor;  
    gMeme.txts.forEach(function (txt) {  //update color in gMeme
        txt.color = getColorValue(); 
        }); 
    renderCanvas(img);   
}
function getFont() {
    var elFont = document.querySelector('.select-font').value;
    console.log('font: ', elFont);
    return elFont;
}
function renderTxtLine(txts) {
    var strHtml = ``
    txts.forEach(function (txt, idx) {
        strHtml +=  `<div class="flex line-btns">
        <button class="btn btn-danger" onclick="deleteLine(event, ${idx})">x</button>
       <input type="txt" class="inline" id="${txt.order}" placeholder="Enter your text" oninput="onTxtInsert(this)">
        <div class="flex arrows">
            <button class="btn left" onclick="moveLine('left')">🠈</button>
            <div class="flex up-down">
                <button class="btn up" moveLine('up')>🠉</button>
                <button class="btn down" moveLine('down')>🠋</button>
            </div>
            <button class="btn right" moveLine('right')>🠊</button>
        </div>
        </div>`;
        // locateTxt(txt, idx);
    })
    // console.log(strHtml);
    
    document.querySelector('.line-text').innerHTML = strHtml;
}

//add text to canvas
function renderTxt(txt) {
    var x = txt.posX;
    // console.log('x: ', x);
    var y = txt.posY + (txt.order * 50);           //every line add 50 px
    // console.log('y: ', y, id);
    // var txt = getTxtById(id);
    // console.log('txt:::', txt, txt.line, txt.order);
    
    var txtSize = `${txt.size}px`;
    // console.log('txtSize: ' ,txtSize);
    
    if (gCanvas.getContext) {
        gCtx.font = `${txtSize} Impact`;  
        // console.log('gCtx.font: ', gCtx.font);
        var currColor = getColorValue(); 
        gCtx.fillStyle = currColor;  
        // txt.color = currColor;     //update color in gMeme
        // console.log('ctx.font: ', gCtx.font);
        // console.log('gMeme.txts[0][color]--', gMeme.txts[0].color);
        gCtx.fillText(txt.line, x, y);
        // console.log('txt: ', txt);
        gCtx.save();
    }
}

function moveLine(pos) {

}

//download
function downloadImg(elImg) {
    var currImg = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    elImg.href = currImg;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var currImg = getCurrImg();
    // console.log('currImg--', currImg);
    initCanvas(currImg);
    // renderCanvas();
}


function onTxtShadow(elBtn) {
    // console.log('Remove--', elBtn.innerText);
    if (elBtn.innerText === 'Remove') txtShadow('none');
}

function onTxtShadowColor(colorValue) {
    //TODO: FOR TXT IN MEME
    var elTextLabel = document.querySelector('.testTxt');
    // console.log('elTextLabel--', elTextLabel);
    var elBtnTxt = document.querySelector('.txt-add-remove-btn');
    // if (elBtnTxt.innerText === 'Add') isTxtShadow('true');

    if (colorValue === '#ffffff') {
        elTextLabel.style.textShadow = '2px 2px 2px #ffffff';
        elBtnTxt.innerText = 'Remove';
        txtShadow('white');
    } else if (colorValue === '#000000') {
        elTextLabel.style.textShadow = '1px 1px 1px #000000';
        elBtnTxt.innerText = 'Remove';
        txtShadow('black');
    } else if (colorValue === 'none') {
        elTextLabel.style.textShadow = 'none';
        elBtnTxt.innerText = 'Add';
    }
}
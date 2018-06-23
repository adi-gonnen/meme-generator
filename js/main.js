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
    var imgDimsObj = renderCanvas();
    renderCanvasSize(imgDimsObj);
    var txts = gMeme.txts;
    renderTxtLine(txts)
    // console.log('txts: ', txts);
    
    // var txt = onTxtInsert();
    // renderTxtCanvas(txt);
}

function onTxtInsert(elLine) {
    if (elLine.value) {
        var idx = elLine.id;
        console.log('idx! ', idx);
        gMeme.txts[idx].line = elLine.value;
        var txt = getTxtById(+idx)
        // var img = getCurrImg();
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
    gMeme.txts.forEach(function (txt) {
        txt.size += (diff * 3);
        // console.log('txt: ', txt);
        // console.log('txt.size: ', txt.size);
        // console.log('txt.line: ', txt.line);
    })
    renderCanvas();
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
    // console.log('elTxt--', elTxt);
    gMeme.txts.forEach(function (txt) {  //update color in gMeme
        txt.color = getColorValue(); 
        }); 
    renderCanvas();   
}

function changeFont() {
    clearCanvas();
    var elFont = document.querySelector('.select-font').value;
    gMeme.txts.forEach(function (txt) {  //update font in gMeme
        txt.font = elFont; 
        // console.log('elTxt--', txt.font);
        }); 
    renderCanvas();  
    // console.log('font: ', elFont);
}

// function changeFont() {
//     clearCanvas();
//     gMeme.txts.forEach(function (txt) {  //update font in gMeme
//         txt.font = getFont(); 
//         console.log('elTxt--', txt.font);
//         }); 
//     renderCanvas();  
// }

function renderTxtLine(txts) {
    var strHtml = ``
    txts.forEach(function (txt, idx) {
        strHtml +=  `<div class="flex line-btns">
        <button class="btn btn-danger" onclick="deleteLine(${idx})">x</button>
        <input type="txt" class="inline" id="${txt.order}" placeholder="Enter your text" oninput="onTxtInsert(this)">
        <div class="flex arrows">
            <button id="${txt.order}" class="btn left" onclick="moveLine(this, 'left')">🠈</button>
            <div class="flex up-down">
                <button id="${txt.order}" class="btn up" onclick="moveLine(this, 'up')">🠉</button>
                <button id="${txt.order}" class="btn down" onclick="moveLine(this, 'down')">🠋</button>
            </div>
            <button id="${txt.order}" class="btn right" onclick="moveLine(this, 'right')">🠊</button>
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
    var txtFont = txt.font;
    console.log('txtFont: ' ,txtFont);
    
    if (gCanvas.getContext) {
        gCtx.font = `${txtSize} ${txtFont}`;  
        console.log('gCtx.font: ', gCtx.font);
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

function moveLine(elLine, pos) {
    var id = elLine.id;
    // console.log('id:: ', id);

    var x = gMeme.txts[id].posX;
    var y = gMeme.txts[id].posY;
    // console.log('posX: ', x, 'posY: ', y);
    if (pos === 'up') {
        y -= 20; 
        gMeme.txts[id].posY = y;
    }
    if (pos === 'down') {
        y += 20; 
        gMeme.txts[id].posY = y;
    }
    if (pos === 'right') {
        x += 20; 
        gMeme.txts[id].posX = x;
    }
    if (pos === 'left') {
        x -= 20;
        gMeme.txts[id].posX = x;
    } 
    console.log('posX: ', x, 'posY: ', y);
    clearInterval();
    renderCanvas();

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

function deleteLine(id) {
    var txts = gMeme.txts;
    txts.splice(id, 1);
    // console.log(elDeleteLine);
    renderTxtLine(txts);  
    clearCanvas();
    renderCanvas();
}
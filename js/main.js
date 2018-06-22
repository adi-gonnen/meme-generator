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
    else return imgs.filter(function(img) {
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
}

function initCanvas(img) {
    gMemeIdUpdate();
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    var imgDimsObj = drawImgOnCanvas(img);
    renderCanvasSize(imgDimsObj);
    renderTxtLine(gMeme.txts);      
    // var txt = onTxtInsert();
    // renderTxtCanvas(txt);
}

function renderMeme() {
    
}

function onTxtInsert(elLine) {
    if (elLine.value) {
        var id = elLine.id;
        gMeme.txts[id].line = elLine.value;
        locateTxt(elLine.value, elLine.id);
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
function updateFontSizeOnEl(elTextLabel, updatedFontSize) {
    // console.log('updatedFontSize-new !!-', updatedFontSize);
    //TODO: change according to txt array
    gMeme.txts[0].size = updatedFontSize;
    gMeme.txts[1].size = updatedFontSize;
    console.log('gMeme.txts[0].size-new !!-', gMeme.txts[0].size);
    console.log('gMeme-after updateFontSizeOnEl', gMeme);
    // console.log('gMeme.txts[0].size-new !!-', gMeme.txts[0].size);
    elTextLabel.style.fontSize = updatedFontSize + 'px';
}

//get current font size
function getCurrFontSize(elTextLabel) {
    console.log('elTextLabel', elTextLabel);
    
    // debugger;
    var fontSizeTxt = window.getComputedStyle(elTextLabel, null).getPropertyValue('font-size');
    var fontSize = parseFloat(fontSizeTxt);
    return fontSize;
}

function updateFontSizeValue(elTextLabel, currFontSize, diff) {
    var fontSizeTxt = elTextLabel.style.fontSize;
    fontSizeTxt = (currFontSize + diff);
    var updatedFontSize = parseFloat(fontSizeTxt);
    return updatedFontSize;
}

//***************text */
function onIncreaseSize() {
    console.log('gMeme.txts[0].size onIncreaseSize', gMeme.txts[0].size);
    console.log('gMeme.txts[1].size onIncreaseSize', gMeme.txts[1].size);

    // debugger;
    clearCanvas();
    onUpdateFontSize(1);
}

function onDecreaseSize() {
    onUpdateFontSize(-1);
}

//***************text */
function onUpdateFontSize(diff) {
    var elTextLabel = getTxtElement();
    // var currFontSize = getCurrFontSize(elTextLabel);
    var currFontSize = gMeme.txts[0].size;
    var updatedFontSize = updateFontSizeValue(elTextLabel, currFontSize, diff);
    // console.log('currFontSize-??--', updatedFontSize);
    updateFontSizeOnEl(elTextLabel, updatedFontSize);
}

//get color-
function getColorValue() {
    var elInputColor = document.querySelector('#colorValue').value;
    // console.log('colorValue-??--', colorValue);
    console.log('elInputColor-??--', elInputColor);
    return elInputColor;
}

//change color
function changeTxtColor(colorValue) {
    //TODO: change element - to txt element on canvas
    // var elTxt = document.querySelector('.txt-container .textlabel');
    // console.log('elTxt--', elTxt);
    // elTxt.style.color = colorValue;
}


function renderTxtLine(txts) {
    var strHtml = ``
    txts.forEach(function (txt, idx) {
        strHtml +=  `<div class="flex line-btns">
        <button class="btn btn-danger" onclick="deleteLine(event, ${idx})">x</button>
       <input type="txt" class="inline" id="${txt.order}" placeholder="Enter your text" oninput="onTxtInsert(this)">
        <div class="flex arrows">
            <button class="btn left">🠈</button>
            <div class="flex up-down">
                <button class="btn up">🠉</button>
                <button class="btn down">🠋</button>
            </div>
            <button class="btn right">🠊</button>
        </div>
        </div>`;
    })
    console.log(strHtml);
    
    document.querySelector('.line-text').innerHTML = strHtml;
}

function locateTxt(txt, id) {
    var img = getCurrImg();
    var x = 140;
    // console.log('x: ', x);
    var y = 60 + id * 50;           //every line add 20 px
    // console.log('y: ', y);
    if (gCanvas.getContext) {
        gCtx.font = "40px Impact";
        gCtx.fillStyle = getColorValue();
        // console.log('ctx.fillStyle--', gCtx.fillStyle);
        // console.log('gMeme.txts[0][color]--', gMeme.txts[0].color);
        gMeme.txts[id].color = gCtx.fillStyle;
        gCtx.fillText(txt, x, y);
        gCtx.save();
    }
}

//download
function downloadImg(elImg) {
    var currImg = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    elImg.href = currImg;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var currImg = getCurrImg();
    console.log('currImg--', currImg);
    initCanvas(currImg);
}

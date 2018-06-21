'use strict'

console.log('test');




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
}

function initCanvas(img) {
    gMemeIdUpdate();
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    var imgDimsObj = drawImgOnCanvas(img);
    renderCanvasSize(imgDimsObj);
}

//get input text from user and draw in canvas
function onTxtInsert() {
    var elLineInput = document.querySelector('.line-input');
    var txt = elLineInput.value;
    console.log('elLineInput', txt);
    renderTxtCanvas(txt);
    //TODO: txts in array
    console.log('gMeme', gMeme);
    gMeme.txts[0].line = txt;
    console.log('gmeme', gMeme);
    return txt;
}

//get DOM txt
function getTxtElement() {
    //TODO: change the selector to txt on canvas
    //TODO: RENDER CANVAS AND CLEAR
    // var elTextLabel = document.querySelector('.textlabel');
    var elTextLabel = document.querySelector('.line-input');
    return elTextLabel;
}

function updateFontSizeOnEl(elTextLabel, updatedFontSize) {
    // console.log('updatedFontSize-new !!-', updatedFontSize);
    //TODO: change according to txt array
    gMeme.txts[0].size = updatedFontSize;
    console.log('gMeme.txts[0].size-new !!-', gMeme.txts[0].size);
    elTextLabel.style.fontSize = updatedFontSize + 'px';
}

//get current font size
function getCurrFontSize(elTextLabel) {
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

function onIncreaseSize() {
    clearCanvas();
    onUpdateFontSize(1);
}

function onDecreaseSize() {
    onUpdateFontSize(-1);
}

function onUpdateFontSize(diff) {
    var elTextLabel = getTxtElement();
    var currFontSize = getCurrFontSize(elTextLabel);
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

//render txt in canvas
function renderTxtCanvas(txt) {
    // var canvas = document.getElementById('canvas');
    // Make sure canvas is supported
    if (gCanvas.getContext) {
        // var ctx = canvas.getContext('2d');
        gCtx.font = "40px Impact";
        gCtx.fillStyle = getColorValue();
        // debugger;
        console.log('ctx.fillStyle--', gCtx.fillStyle);
        //TODO :  change according to txt array
        console.log('gMeme.txts[0][color]--', gMeme.txts[0].color);
        gMeme.txts[0].color = gCtx.fillStyle;
        gCtx.fillText(txt, 248, 43);
        gCtx.save();
    }
}


//download

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var currImg = getCurrImg();
    console.log('currImg--', currImg);
    initCanvas(currImg);
}

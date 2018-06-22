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
}

function initCanvas(img) {
    gMemeIdUpdate();
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    var imgDimsObj = drawImgOnCanvas(img);
    renderCanvasSize(imgDimsObj);
    // var txt = onTxtInsert();
    // renderTxtCanvas(txt);
}

function renderMeme() {

}

//TODO: dinamic -  array of txts
//get input text from user and draw in canvas
function onTxtInsert() {
    var elLineInputTop = document.querySelector('.line-input-top');
    var elLineInputBottom = document.querySelector('.line-input-bottom');
    // var elLineInput;
    var txt
    var pos;
    if (elLineInputTop.value) {
        txt = elLineInputTop.value;
        pos = 'top';
        gMeme.txts[0].line = txt;
        // console.log('elLineInputTop', txt);
        renderTxtCanvas(txt, pos);
    }
    if (elLineInputBottom.value) {
        txt = elLineInputBottom.value;
        pos = 'bottom';
        // console.log('elLineInputBottom', txt);
        gMeme.txts[1].line = txt;
        renderTxtCanvas(txt, pos);
        // console.log('gMene: ', gMeme);
    }
    // var txt = elLineInput.value;
    // return txt;
}

// what this???
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

//render txt in canvas
function renderTxtCanvas(txt, pos) {
    // var canvas = document.getElementById('canvas');
    var img = getCurrImg();
    var x = gMeme.width / 2;
    console.log('x: ', x);

    var y = gMeme.height / 2;
    console.log('y: ', y);
    // Make sure canvas is supported
    if (gCanvas.getContext) {
        gCtx.font = "40px Impact";
        gCtx.fillStyle = getColorValue();
        console.log('ctx.fillStyle--', gCtx.fillStyle);
        console.log('gMeme.txts[0][color]--', gMeme.txts[0].color);
        gMeme.txts[0].color = gCtx.fillStyle;
        if (pos === 'top') gCtx.fillText(txt, x, y);
        else {
            y = gCanvas.style.top + 370;
            gCtx.fillText(txt, x, y);
        }
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


function onTxtShadow(elBtn) {
    console.log('Remove--', elBtn.innerText);
    if (elBtn.innerText === 'Remove') txtShadow('none');
}

function onTxtShadowColor(colorValue) {
    //TODO: FOR TXT IN MEME
    var elTextLabel = document.querySelector('.testTxt');
    console.log('elTextLabel--', elTextLabel);
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
    



    // var isShadow = isTxtShadow();
    // var elBtnTxt = document.querySelector('.txt-add-remove-btn');
    // if (isShadow) elBtnTxt.innerText = 'Remove';
    // else elBtnTxt.innerText = 'Add';
    // var isShadow = isTxtShadow();
    // var elBtnTxt = document.querySelector('.txt-add-remove-btn');
    // if (isShadow) elBtnTxt.innerText = 'Remove';
    // else elBtnTxt.innerText = 'Add';



    //TODO: maybe to do it in array txts
    // console.log('currTxtColor--', currTxtColor);
    

    //TODO: try to do toggle - but txt on canvas is not DOM??
    //TODO:  isTxtShadow(); - RETURN STRUE OR FALSE AND UPDATE gMeme
    // isTxtShadow();

}

// function onTxtShadow() {
//     //TODO: FOR TXT IN MEME
//     var elTextLabel = document.querySelector('.testTxt');
//     console.log('elTextLabel--', elTextLabel);
//     //get the color of text
//     //TODO: maybe to do it in array txts
//     var currTxtColor = gMeme.txts[0].color;
//     console.log('currTxtColor--', currTxtColor);
//     // var colorStrs = currTxtColor.split('');
//     // console.log('colorStrs--', colorStrs);
//     // console.log('colorStrs[1]--', colorStrs[1]);
//     // console.log('typeof colorStrs[1]--', typeof colorStrs[1]);
//     // var firstDigitNumber = +colorStrs[1];
//     // console.log('firstDigitNumber--', firstDigitNumber);
//     // if (typeof firstDigitNumber === 'number' && firstDigitNumber <= 6) {
//     //     elTextLabel.style.textShadow = '1px 1px 1px #ffffff';
//     // } else elTextLabel.style.textShadow = '1px 1px 1px #000000';
//     // console.log('elTextLabel.style.textShadow--', elTextLabel.style.textShadow);

//     //put a middum color of text shadow - good for dark & light colors
//     elTextLabel.style.textShadow = '1px 1px 1px #7f7f7f';
//     //TODO: if color hex number starts from 0 to 6 - in is dark color - put white text shadow -OR to Put two btns

//     //TODO: try to do toggle - but txt on canvas is not DOM??
//     //TODO:  isTxtShadow(); - RETURN STRUE OR FALSE AND UPDATE gMeme
//     // isTxtShadow();

// }
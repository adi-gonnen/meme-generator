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
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    var imgDimsObj = drawImgOnCanvas(img);
    renderCanvasSize(imgDimsObj);
    // var txt = onTxtInsert();
    // renderTxtCanvas(txt);
}

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
        // console.log('elLineInputTop', txt);
        renderTxtCanvas(txt, pos);
    } 
    if (elLineInputBottom.value) {
        txt = elLineInputBottom.value;
        pos = 'bottom';
        // console.log('elLineInputBottom', txt);
        renderTxtCanvas(txt, pos);
    }
    // var txt = elLineInput.value;
    // return txt;
}


//get DOM txt
function getTxtElement() {
    //TODO: change the selector to txt on canvas
    //TODO: RENDER CANVAS AND CLEAR
    var elTextLabel = document.querySelector('.textlabel');
    return elTextLabel;
}

function updateFontSizeOnEl(elTextLabel, updatedFontSize) {
    // console.log('updatedFontSize-new !!-', updatedFontSize);
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
function getColorValue(colorValue) {
    // console.log('colorValue-??--', colorValue);
    return changeTxtColor(colorValue);
}

//change color
function changeTxtColor(colorValue) {
    //TODO: change element - to txt element on canvas
    var elTxt = document.querySelector('.txt-container .textlabel');
    // console.log('elTxt--', elTxt);
    elTxt.style.color = colorValue;
}

//render txt in canvas
function renderTxtCanvas(txt, pos) {
    var x = 250;
    var y = 400;
  // Make sure canvas is supported
  if (gCanvas.getContext){
    gCtx.font = "40px Impact";       
    gCtx.fillStyle = 'white';
    if (pos === 'top') gCtx.fillText(txt, 250, 43);
    else gCtx.fillText(txt, x, y);
    gCtx.save();      
  }                  
}

function downloadImg(elImg) {
    var currImg = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    elImg.href = currImg;
}

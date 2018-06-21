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
    elCanvas.classList.remove('hide');
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add('hide');
    var elSearch = document.querySelector('.filter');
    elSearch.classList.add('hide');
}





// CANVAS


function initCanvas(img) {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    var imgDimsObj = drawImgOnCanvas(img);
    renderCanvasSize(imgDimsObj);
    var txt = onTxtInsert();
    renderTxtCanvas(txt);
}

//get input text from user and draw in canvas
function onTxtInsert() {
    var elLineInput = document.querySelector('.line-input');
    var txt = elLineInput.value;
    console.log('elLineInput', txt);
    renderTxtCanvas(txt);
    return txt;
}

//render txt in canvas
function renderTxtCanvas(txt) {
    var canvas = document.getElementById('canvas');
 
  // Make sure canvas is supported
  if (canvas.getContext){
     var ctx = canvas.getContext('2d');
     ctx.font = "40px Impact";       
    //  ctx.color="white";
    ctx.fillStyle = 'white';
     ctx.fillText(txt, 248, 43);
     ctx.save();      
  }                  
}
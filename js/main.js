'use strict'

function toggleHoverGalleryNav() {
    var elGalleryLink = document.querySelector('.gallery-link-a');
    elGalleryLink.classList.toggle('gallery-link-hover');
}

function renderGallery(imgs) {
    imgs = getImgsForDisplay();
    var strHtml = '';
    imgs.forEach(function (img, idx) {
        strHtml += `<img id="${img.id}" class="item-img" onclick="selectImg(this)" style="background-image: url('${img.url}')"></img>\n`
    });
    document.querySelector('.gallery').innerHTML = strHtml;
    // console.log(strHtml);
}

function filterImgs(imgs) {
    var userSearch = document.getElementById('search').value;
    if (userSearch === '') return imgs;
    else return imgs.filter(function (img) {
        return img.keywords.some(function (keyword) {
            return keyword.substring(0, userSearch.length) === userSearch;
        });
    });
}

function toggleGallery() {
    var elCanvas = document.querySelector('.container-canvas-page');
    elCanvas.classList.toggle('hide');
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hide');
    var elSearch = document.querySelector('.filter');
    elSearch.classList.toggle('hide');
    var elGalleryLink = document.querySelector('.gallery-link');
    elGalleryLink.classList.toggle('gallery-link-hover');
}

// CANVAS

function initCanvas(img) {
    // gMeme.selectedImgId = img.id;       
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    var imgDimsObj = renderCanvas();
    renderCanvasSize(imgDimsObj);
    var txts = gMeme.txts;
    locateLine();
    renderTxtLine(txts);
}

function onTxtInsert(elLine) {
    if (elLine.value) {
        var idx = elLine.id;
        // console.log('idx! ', idx);
        gMeme.txts[idx].line = elLine.value;
        var txt = getTxtById(+idx)
        // console.log('txt! ', txt);
        renderCanvas();
    } 
}

function onChangeSize(diff) {
    // clearCanvas();
    gMeme.size += (diff * 3);
    renderCanvas();
}

//change color
function onChangeColor() {
    var elInputColor = document.querySelector('#colorValue').value;
    gMeme.color = elInputColor;
    renderCanvas();  
}

function changeFont() {
    // clearCanvas();
    var elFont = document.querySelector('.select-font').value;
        gMeme.font = elFont; 
    renderCanvas();  
}

function renderTxtLine() {
    var strHtml = ``
    gMeme.txts.forEach(function (txt, idx) {
        strHtml +=  `<div class="flex line-btns">
            <input type="txt" class="inline" id="${txt.order}" placeholder="Enter your text" oninput="onTxtInsert(this)" onkeyup="handleKey(event)" autofocus>
            <div class="line-btns-container flex space-around align-center">
                <button class="btn btn-danger" onclick="onDeleteLine(${idx})"><i class="fa fa-trash"></i></button>
                <div class="flex arrows">
                    <button id="${txt.order}" class="btn left" onclick="moveLine(this, 'left')"><i class="fa fa-arrow-left"></i></button>
                    <button id="${txt.order}" class="btn up" onclick="moveLine(this, 'up')">🠉</button>
                    <button id="${txt.order}" class="btn down" onclick="moveLine(this, 'down')">🠋</button>
                    <button id="${txt.order}" class="btn right" onclick="moveLine(this, 'right')">🠊</button>
                </div>
            </div>
        </div>`;
    })
    // console.log(strHtml);
    //<button id="${txt.order}" class="btn left" onclick="moveLine(this, 'left')">🠈</button>
    document.querySelector('.line-text').innerHTML = strHtml;
}

//add text to canvas

function moveLine(elLine, pos) {
    var id = elLine.id;
    // console.log('id:: ', id);

    var x = gMeme.txts[id].posX;
    var y = gMeme.txts[id].posY;
    console.log('before- posX: ', x, 'posY: ', y);
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
    console.log('after--posX: ', x, 'posY: ', y);
    // clearInterval();
    renderCanvas();

}

//download
function downloadImg(elImg) {
    var currImg = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    elImg.href = currImg;
}

// function onTxtShadow(elBtn) {
//     // console.log('Remove--', elBtn.innerText);
//     if (elBtn.innerText === 'Remove') txtShadow('none');
// }

// function onTxtShadowColor(colorValue) {
//     //TODO: FOR TXT IN MEME
//     // var elTextLabel = document.querySelector('.testTxt');
//     // elTextLabel.style.color = 'white';
//     // console.log('elTextLabel--', elTextLabel);
//     // var elBtnTxt = document.querySelector('.txt-add-remove-btn');
//     // if (elBtnTxt.innerText === 'Add') isTxtShadow('true');

//     gMeme.txts.forEach(function (txt, idx) {
//         console.log('idx!!', idx);
//         if (colorValue === '#ffffff') {
            
//             txt.line.style.textShadow = '3px 1px 2px #ffffff';
//             txtShadow('white');
//             // renderCanvas();
//         } else if (colorValue === '#000000') {
//             txt.line.style.textShadow = '4px 4px 1px #000000';
//             txtShadow('black');
//             // renderCanvas();
//         } else if (colorValue === 'none') {
//             txt.line.style.textShadow = 'none';
//             // renderCanvas();
//         }
//         renderTxt(txt, idx);
//         })


//     // if (colorValue === '#ffffff') {
//     //     elTextLabel.style.textShadow = '3px 1px 2px #ffffff';
//     //     txtShadow('white');
//     //     // renderCanvas();
//     // } else if (colorValue === '#000000') {
//     //     elTextLabel.style.textShadow = '4px 4px 1px #000000';
//     //     txtShadow('black');
//     //     // renderCanvas();
//     // } else if (colorValue === 'none') {
//     //     elTextLabel.style.textShadow = 'none';
//     //     // renderCanvas();
//     // }
// }

function onDeleteLine(id) {
    gMeme.txts[id].line = '';
    // clearCanvas();
    renderCanvas();
    renderTxtLine();
}

function handleKey(ev) {
    // console.log('ev:', ev);
    if (ev.key === 'Backspace') {
        // clearCanvas();
        renderCanvas();
        var elInput = getElementById('0');
        elInput.value = txts[0].line;
    }
}

// function clearCanvas() {
//     gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
//     // var currImg = getCurrImg();
//     // console.log('currImg--', currImg);
//     // initCanvas(currImg);
//     // renderCanvas();
// }


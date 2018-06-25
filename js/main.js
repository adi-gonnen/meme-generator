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

function showGallery() {
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.remove('hide');
    var elSearch = document.querySelector('.filter');
    elSearch.classList.remove('hide');
    var elCanvas = document.querySelector('.container-canvas-page');
    elCanvas.classList.add('hide');
    var elAbout = document.querySelector('.about-us');
    elAbout.classList.add('hide');
    addActiveOnLink('.gallery-link');
    removeActiveOnLink('.about-link');
    clearCanvas();
}
function showAbout() {
    var elAbout = document.querySelector('.about-us');
    elAbout.classList.remove('hide');
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add('hide');
    var elSearch = document.querySelector('.filter');
    elSearch.classList.add('hide');
    var elCanvas = document.querySelector('.container-canvas-page');
    elCanvas.classList.add('hide');
    addActiveOnLink('.about-link');
    removeActiveOnLink('.gallery-link');
}
function showCanvas() {
    var elCanvas = document.querySelector('.container-canvas-page');
    elCanvas.classList.remove('hide');
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add('hide');
    var elSearch = document.querySelector('.filter');
    elSearch.classList.add('hide');
    var elAbout = document.querySelector('.about-us');
    elAbout.classList.add('hide');
    removeActiveOnLink('.gallery-link');
    removeActiveOnLink('.about-link');
    
}

// CANVAS

function initCanvas(img) {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    gMeme = createMeme();
    var imgDimsObj = renderCanvas();
    renderCanvasSize(imgDimsObj);
    var txts = gMeme.txts;
    locateLine();
    renderTxtLine(txts);
    console.log(gMeme);
    
}

function onTxtInsert(elLine) {
    if (elLine.value) {
        var idx = elLine.id;
        gMeme.txts[idx].line = elLine.value;
        var txt = getTxtById(+idx)
        renderCanvas();
    } 
}

function onChangeSize(diff) {
    gMeme.size += (diff * 3);
    renderCanvas();
}

function onChangeColor() {
    var elInputColor = document.querySelector('#colorValue').value;
    gMeme.color = elInputColor;
    renderCanvas();  
}

function changeFont() {
    var elFont = document.querySelector('.select-font').value;
        gMeme.font = elFont; 
    renderCanvas();  
}

function renderTxtLine() {
    var strHtml = ``
    gMeme.txts.forEach(function (txt, idx) {
        strHtml +=  `<div class="flex line-btns">
            <input type="txt" class="inline" id="${txt.order}" placeholder="Enter your text" `
            console.log('txt.line');
        if (txt.value !== '') {
            strHtml += ` value="${txt.line}" `;
        }
            
        strHtml += 
            `oninput="onTxtInsert(this)" onkeyup="handleKey(event)" autofocus>
            <div class="line-btns-container flex space-around align-center">
                <button class="btn btn-danger" onclick="onDeleteLine(${idx})"><i class="fa fa-trash"></i></button>
                <div class="flex arrows">
                    <button id="${txt.order}" class="btn left" onclick="moveLine(this, 'left')"><i class="fas fa-arrow-left"></i></button>
                    <button id="${txt.order}" class="btn up" onclick="moveLine(this, 'up')"><i class="fas fa-arrow-up"></i></button>
                    <button id="${txt.order}" class="btn down" onclick="moveLine(this, 'down')"><i class="fas fa-arrow-down"></i></button>
                    <button id="${txt.order}" class="btn right" onclick="moveLine(this, 'right')"><i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </div>`;
    })
    document.querySelector('.line-text').innerHTML = strHtml;
}

function moveLine(elLine, pos) {
    var id = elLine.id;

    var x = gMeme.txts[id].posX;
    var y = gMeme.txts[id].posY;
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
    renderCanvas();

}

//download
function downloadImg(elImg) {
    var currImg = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    elImg.href = currImg;
}

function onDeleteLine(id) {
    gMeme.txts[id].line = '';
    renderCanvas();
    renderTxtLine();
}

function handleKey(ev) {
    if (ev.key === 'Backspace') renderCanvas();
}

function submitMail(name) {
    var mail;
    if (name === 'adi') mail = 'adigonnen@gmail.com';
    else mail = 'reshef.liron@gmail.com'
    window.location = open(`https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`,"_blank");
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme = createMeme();
}

function addActiveOnLink(className) {
    var elLink = document.querySelector(className);
    elLink.classList.add('active');
}

function removeActiveOnLink(className) {
    var elLink = document.querySelector(className);
    elLink.classList.remove('active');
}

function addClassBlockBtn() {
    var elAddBtn = document.querySelector('.add-line-btn');
    elAddBtn.classList.add('block-btn');
    elAddBtn.style.color = 'grey';
}

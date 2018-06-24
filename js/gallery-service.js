'use strict'


var gImgs = [
    {id: makeId(), url: './img/2.jpg', keywords: ['happy']},
    {id: makeId(), url: './img/003.jpg', keywords: ['politics', 'famous','tramp']},
    {id: makeId(), url: './img/skeleton.jpg', keywords: ['skeleton']},
    {id: makeId(), url: './img/005.jpg', keywords: ['pets','dog','baby']},
    {id: makeId(), url: './img/5.jpg', keywords: ['baby', 'angry']},
    {id: makeId(), url: './img/006.jpg', keywords: ['pets','cat']},
    {id: makeId(), url: './img/8.jpg', keywords: ['happy', 'wounder']},
    {id: makeId(), url: './img/9.jpg', keywords: ['happy', 'baby']},
    {id: makeId(), url: './img/12.jpg', keywords: ['famous']},
    {id: makeId(), url: './img/19.jpg', keywords: ['angry','scary']},
    {id: makeId(), url: './img/Ancient-Aliens.jpg', keywords: ['funny']},
    {id: makeId(), url: './img/drevil.jpg', keywords: ['funny']},
    {id: makeId(), url: './img/img2.jpg', keywords: ['funny', 'children']},
    {id: makeId(), url: './img/img4.jpg', keywords: ['politics', 'famous','tramp']},
    {id: makeId(), url: './img/img5.jpg', keywords: ['children']},
    {id: makeId(), url: './img/img6.jpg', keywords: ['pets','dog']},
    {id: makeId(), url: './img/004.jpg', keywords: ['pets','dog']},
    {id: makeId(), url: './img/img11.jpg', keywords: ['politics', 'obama']},
    {id: makeId(), url: './img/img12.jpg', keywords: ['sport']},
    {id: makeId(), url: './img/leo.jpg', keywords: ['famous','happy']},
    {id: makeId(), url: './img/meme1.jpg', keywords: ['scary']},
    {id: makeId(), url: './img/One-Does-Not-Simply.jpg', keywords: []},
    {id: makeId(), url: './img/Oprah-You-Get-A.jpg', keywords: ['famous','happy','opera']},
    {id: makeId(), url: './img/patrick.jpg', keywords: ['patrick']},
    {id: makeId(), url: './img/putin.jpg', keywords: ['putin']},
    {id: makeId(), url: './img/X-Everywhere.jpg', keywords: ['toy']},
    {id: makeId(), url: './img/protrait.jpg', keywords: ['woman']},
    {id: makeId(), url: './img/bear.jpg', keywords: ['animal']},
    {id: makeId(), url: './img/tiger.jpg', keywords: ['animal']},
    {id: makeId(), url: './img/monkey.jpg', keywords: ['animal']},
    {id: makeId(), url: './img/elef.jpg', keywords: ['animal']},
]; 

var IMG_KEY = 'currImg';

function init() {
    renderGallery(gImgs);
}

function searchImg() {
    renderGallery();
}

function getImgsForDisplay() {
    var imgs = [];
    imgs = filterImgs(gImgs)
    return imgs;
}

function backToGallery() {
    showGallery();
    gMeme.txts.forEach(function (txt) {
        txt.line = '';
        })
}

function selectImg(elImg) {
    localStorage.clear();
    var imgId = elImg.id;
    var img = findItemById(imgId);
    showCanvas();
    saveCurrImg(img);
    initCanvas(img);
}

function findItemById(imgId) {
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        if (img.id === imgId) {
            return img;
        }
    }
}

function saveCurrImg(img) {
    saveToStorage(IMG_KEY, img);
}

function getCurrImg() {
    var currImg = loadFromStorage(IMG_KEY);
    return currImg;
}
'use strict'

console.log('test');


function init() {
    renderGallery();
}

function renderGallery() {
    var imgs = filterImgs(gImgs)
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

function selectImg(elImg) {
    console.log('elImg', elImg);
    var imgId = elImg.id;
    var img = findItemById(imgId);
    toggleGallery();
    initCanvas(img);
}

function toggleGallery() {
    var showCanvas = document.querySelector('.container-canvas-page');
    showCanvas.classList.remove('hide');
    var hideGallery = document.querySelector('.gallery');
    hideGallery.classList.add('hide');
}

function findItemById(imgId) {
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        if (img.id === imgId) {
            console.log('img.id', img.id);
            console.log('id', imgId);
            return img;
        }
    }
}
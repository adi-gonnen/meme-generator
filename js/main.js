'use strict'

console.log('test');


function init() {
    renderGallery();
}

function renderGallery() {
    var imgs = getImgsForDisplay()
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
        return img.keywords.forEach(function (keyword) {
            return keyword === userSearch;
            })
        })
}

function getImgsForDisplay() {
    var imgs = [];
    imgs = filterImgs(gImgs)
    return imgs;
}

function selectImg(elImg) {
    toggleGallery();
}

function toggleGallery() {
    var showCanvas = document.querySelector('.canvas');
    showCanvas.classList.remove('hide');
    var hideGallery = document.querySelector('.gallery');
    hideGallery.classList.add('hide');
}
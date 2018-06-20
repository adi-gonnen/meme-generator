'use strict'

console.log('canvas');

var gImgsTest = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];

var gMemeTest = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
};

var canvas = document.querySelector('.canvas');
var context = canvas.getContext('2d');

//TODO: init() function on canvas - when user choose a img
renderCanvasSize();
drawImgOnCanvas();
var txt = onTxtInsert();
renderTxtCanvas(txt);

//function renderCanvasSize = get the size of image and render according it
//TODO: change the width & height according img size
function renderCanvasSize() {
    canvas.width = 675;
    canvas.height = 450;
    context.fillStyle = 'lightblue';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

//render img 
//TODO: get url and then draw on canvas
function drawImgOnCanvas() {
    // gImgsTest[0].url = 
    var img = new Image();
    img.src = 'img/2.jpg';
    img.onload = function() {
        context.drawImgOnCanvas(img, 0, 0, canvas.width, canvas.height);
    }
}



//get input text from user and draw in canvas
// function drawTxtInCanvas(elEnteredTxt) {
function onTxtInsert() {
    var elLineInput = document.querySelector('.line-input');
    var txt = elLineInput.value;
    console.log('elLineInput', txt);
    return txt;
}

//render txt in canvas
function renderTxtCanvas(txt) {

}


//TODO: function get URL by Id
function getImgById() {

}
// getImgWidthHeight();


// TODO: NOT WORKING!! according URL get width and height of the img
function getImgWidthHeight() {
    var imgUrl = '2.jpg';
    console.log('imgUrl.width', imgUrl.width);

    // imgUrl.width;
}


var titleContainer = document.getElementsByClassName("title-container")[0];
var sliderH = document.getElementsByClassName("sliderH")[0];
var header = document.getElementsByClassName("header")[0];
var sliderV1 = document.getElementsByClassName("sliderV1")[0];
var sliderV2 = document.getElementsByClassName("sliderV2")[0];

// titleContainer.style.left =  '100vw';
window.onload = function() {
    titleContainer.style.transform = 'scale(1)';
    sliderH.style.left = '0';
    header.style.top = '0';
    header.style.opacity = '1';
    sliderV1.style.top = '-50%';
    sliderV2.style.bottom = '-50%';
}
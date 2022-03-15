const modal_open = document.querySelector(".open_comment"); //class open_comment
const modal_close = document.querySelector(".close_comment");
const modalpage = document.querySelector(".modal_group");
modal_open.onclick = function(){
    modalpage.style.display = "flex"; //모달창 가운데 오도록
};
modal_close.onclick = function(){
    modalpage.style.display = "none";
};
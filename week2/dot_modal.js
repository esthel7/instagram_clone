const open_modal = document.querySelector(".open"); /*class open*/
const close_modal = document.querySelector(".close");
const modal_page = document.querySelector(".modal_wrapper");
open_modal.onclick = function(){
    modal_page.style.display = "flex"; //모달창 가운데 오도록
};
close_modal.onclick = function(){
    modal_page.style.display = "none";
};
modal_page.addEventListener("click", e => { //배경 누르면 모달창 닫히게하기 위함
    if(e.target.classList.contains("modal_wrapper")) {
        modal_page.style.display = "none"
    }
})
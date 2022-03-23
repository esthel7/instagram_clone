function change(photo){
    if (photo.src=="https://cdn-icons-png.flaticon.com/512/6165/6165217.png"){
        //클릭 안된 북마크 클릭
        photo.src='https://cdn-icons-png.flaticon.com/512/1174/1174447.png';
    }
    else if(photo.src=="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png"){
        //클릭 안된 좋아요 클릭
        photo.src="https://mblogthumb-phinf.pstatic.net/20140709_176/wsm0030_1404859139443xgQQv_PNG/PicsArt_1404831829726.png?type=w2";
        photo.style.height="32px";
    }
    else if(photo.src=='https://cdn-icons-png.flaticon.com/512/1174/1174447.png'){
        //클릭된 북마크 취소
        photo.src="https://cdn-icons-png.flaticon.com/512/6165/6165217.png"
    }
    else{
        //클릭 안된 좋아요 클릭
        photo.src="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png";
        photo.style.width="30px;";
        photo.style.height="30px;";
    }
}

function make_comment(){
    const newComment=document.createElement('div');//div태그로 감싸짐
    const text=document.createElement('span');//span태그로 감싸짐
    const time=document.createElement('div');
    const comment=document.getElementById("comment");
    const img=`
    <img class="img" src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png" width="60px">
    <img class="img_h" src="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png"
    width="12px;" height="12px;">
    `;
    const name=`<b class="name">User_Id&nbsp;&nbsp;</b>`;//&nbsp;는 띄어쓰기
    const time_text=`<br>지금 &nbsp;<b>답글 달기</b>`;

    newComment.classList.add('commentGroup');//div태그에 class commentGroup 추가하기
    text.classList.add('text');//span태그에 class text 추가하기
    time.classList.add('time');//div태그에 class time 추가
    
    text.innerHTML=name;//html형식일 경우 innerHTML
    text.append(comment.value);//댓글의 내용을 text에 추가
    time.innerHTML=time_text;
    text.append(time);
    newComment.innerHTML=img;
    newComment.append(text);
    
    const stylegroup=document.createElement('style');
    const styles=`
        .img{
            margin:0px 10px;
            margin-right:5px;
            position:relative;
        }
        .img_h{
            float:right;
            margin-right:15px;
            position:relative;
            top:20px;
        }
        .text{ 
            position:relative;
            bottom:30px;
        }
        .time{
            font-size:14px;
            color:gray;
            padding-left:80px;
        }
    `;
    stylegroup.innerText=styles;//stylegroup안에 styles 넣기
    document.head.appendChild(stylegroup);//css적용되도록

    const showComment=document.querySelector('.show');
    showComment.append(newComment);//class가 show인 곳에 div로 감싸진 전체 내용 삽입됨

    /* newComment 형태 예시
    <div class="commentGroup">
        img
        <span class="text">
            name
            id가 comment인 내용
            <div class="time">
                time
            </div>
        </span>
    </div>
    */
}

/*comment_modal*/
const modal_open = document.querySelector(".open_comment"); //class open_comment
const modal_close = document.querySelector(".close_comment");
const modalpage = document.querySelector(".modal_group");
modal_open.onclick = function(){
    modalpage.style.display = "flex"; //모달창 가운데 오도록
};
modal_close.onclick = function(){
    modalpage.style.display = "none";
};

/*dot modal*/
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
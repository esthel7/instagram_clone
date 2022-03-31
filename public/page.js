/*user modal*/
const open_user = document.querySelector('.user');//class user. getElementsByClassName과의 차이점은 querySelector는 제일 처음것만 가져옴
const close_user = document.querySelector('.close_user_modal');
const user_modal = document.querySelector('.user_modal_wrapper');
open_user.onclick = function(){
    user_modal.style.display="flex";
};
close_user.onclick = function(){
    location.href='/logout'; //로그아웃 버튼 누르면 localhost:3000/logout 으로 이동
};
user_modal.onclick=function(){//배경 누르면 모달창 닫히게하기 위함
    user_modal.style.display="none";
};

function change(photo,check){
    let like;
    let num;
    if(check!=undefined){
        like=document.getElementsByClassName('number');//좋아요 숫자 나타내는 class 값, 배열형식임
        num=like[check].innerText;//Id 값의 내용(좋아요 숫자), check으로 해당 class에 접근해줘야함
    }

    if (photo.src=="https://cdn-icons-png.flaticon.com/512/6165/6165217.png"){
        //클릭 안된 북마크 클릭
        photo.src='https://cdn-icons-png.flaticon.com/512/1174/1174447.png';
    }
    else if(photo.src=="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png"){
        //클릭 안된 좋아요 클릭
        photo.src="https://mblogthumb-phinf.pstatic.net/20140709_176/wsm0030_1404859139443xgQQv_PNG/PicsArt_1404831829726.png?type=w2";
        photo.style.height="32px";
        num=parseInt(num)+1; //parseInt는 문자열 읽어서 정수형으로 반환 parseInt 없으면 46개에서 461 됨
    }
    else if(photo.src=='https://cdn-icons-png.flaticon.com/512/1174/1174447.png'){
        //클릭된 북마크 취소
        photo.src="https://cdn-icons-png.flaticon.com/512/6165/6165217.png"
    }
    else{
        //클릭된 좋아요 취소
        photo.src="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png";
        photo.style.width="30px;";
        photo.style.height="30px;";
        num=parseInt(num)-1;
    }
    if(check!=undefined) like[check].innerText=num;//좋아요 숫자 반영하기
}

function make_comment(num){
    const newComment=document.createElement('div');//div태그로 감싸짐
    const text=document.createElement('span');//span태그로 감싸짐
    const time=document.createElement('div');
    const comment_div=document.createElement('div');
    const comment=document.getElementsByClassName("comment_text");
    const img=`
    <img class="img" src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png" width="60px">
    <img class="img_h" src="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png"
    width="12px;" height="12px;">
    `;
    const name=`<b class="name">User_Id&nbsp;&nbsp;</b>`;//&nbsp;는 띄어쓰기
    const time_text=`지금 &nbsp;<b>답글 달기</b>`;

    newComment.classList.add('commentGroup');//div태그에 class commentGroup 추가하기
    text.classList.add('text');//span태그에 class text 추가하기
    time.classList.add('time');
    comment_div.classList.add('div_comment');
    
    comment_div.append(comment[num].value);//댓글의 내용을 comment_div에 추가
    text.innerHTML=name;//html형식일 경우 innerHTML
    text.append(comment_div);//댓글내용이 담긴 div태그를 text에 추가
    time.innerHTML=time_text;
    text.append(time);
    newComment.innerHTML=img;
    newComment.append(text);
    
    const stylegroup=document.createElement('style');
    const styles=`
        .div_comment{
            width:300px;
            word-wrap: break-word; /*문장 길면 width에 맞춰서 자동 줄바꿈*/
            position:relative;
            top:-22px;
            left:150px;
        }
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
    document.head.appendChild(stylegroup);//css적용되도록 head태그 안에 넣기

    const showComment=document.getElementsByClassName('show');
    showComment[num].append(newComment);//class가 show인 곳에 div로 감싸진 전체 내용 삽입됨

    /* newComment 형태 예시
    <div class="commentGroup">
        img
        <span class="text">
            name
            <div class="div_comment">
                id가 comment인 내용
            </div>
            <div class="time">
                time
            </div>
        </span>
    </div>
    */
}

let post_photo1,contents1,long_contents1,time1,like_num1,post_photo2,contents2,long_contents2,like_num2,time2;
function pass(photo1,cont1,long1,like1,post_time1,photo2,cont2,long2,like2,post_time2){//onload함수로, 가장 늦게 실행됨
    post_photo1=photo1;
    contents1=cont1;
    long_contents1=long1;
    like_num1=like1;
    time1=post_time1;
    post_photo2=photo2;
    contents2=cont2;
    long_contents2=long2;
    like_num2=like2;
    time2=post_time2;
    cloning();//pass함수 실행 후 실행되어야 함
};

/*new post*/
function makePost(photo, num, num2, num3, like, text, long, time){
    return `
    <div class="post">
        <img src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png" width="40px" style="margin:7px 10px;float:left;">
        <span style="display:inline-block; margin:13px 0px; font-size:16px;">
            sejong_univ
        </span>
        <button class="open" style="float:right; margin:15px; border:none; background-color:white;" onclick="dot_modal(${num});">
            <img src="https://cdn-icons-png.flaticon.com/512/60/60969.png" width="15px;">
        </button>
        <!--dot modal-->
        <div class="modal_wrapper" style="display:none;">
            <div class="modal">
                <div class="modal_sq" style="color:red; font-weight:bold;">
                    신고
                </div>
                <div class="modal_sq" style="color:red; font-weight:bold;">
                    팔로우 취소
                </div>
                <div class="modal_sq">
                    게시물로 이동
                </div>
                <div class="modal_sq">
                    공유 대상...
                </div>
                <div class="modal_sq">
                    링크 복사
                </div>
                <div class="modal_sq">
                    퍼가기
                </div>
                <div class="close_wrapper">
                    <button class="close">취소</button>
                </div>
            </div>
        </div>

        <img src=${photo} width="600px;">

        <div style="text-align:center;">
            <img src="https://kr.seaicons.com/wp-content/uploads/2015/06/Circle-icon.png" width="7px">
            <img src="https://m.smartcara.com/web/product/option_button/202105/0862794c02ec7f7e906e98d1cf44f1ea.png" width="6px">
            <img src="https://m.smartcara.com/web/product/option_button/202105/0862794c02ec7f7e906e98d1cf44f1ea.png" width="6px">
            <img src="https://m.smartcara.com/web/product/option_button/202105/0862794c02ec7f7e906e98d1cf44f1ea.png" width="6px">
            <img src="https://m.smartcara.com/web/product/option_button/202105/0862794c02ec7f7e906e98d1cf44f1ea.png" width="6px">
            <img src="https://m.smartcara.com/web/product/option_button/202105/0862794c02ec7f7e906e98d1cf44f1ea.png" width="6px">
            <img src="https://m.smartcara.com/web/product/option_button/202105/0862794c02ec7f7e906e98d1cf44f1ea.png" width="6px">
            <img src="https://m.smartcara.com/web/product/option_button/202105/0862794c02ec7f7e906e98d1cf44f1ea.png" width="6px">
        </div>

        <span class="icon_below icon_click" style="margin-left:16px;">
            <img src="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png"
            width="30px;" height="30px;" onclick="change(this,${num3});">
        </span>
        <span class="icon_below">
            <button class="open_comment" style=" border:none; background-color:white;" onclick="comment_modal(${num});">
                <img src="https://cdn-icons-png.flaticon.com/512/2/2043.png" width="30px">
            </button>
            <div class="modal_group" style="display:none;">
                <div class="modal_comment" id="group">
                    <div class="modal_left" style="float:left;">
                        <!--photo change-->
                        <img src="${photo}" width="800px" style="border-right:1px solid lightgray; position:relative;">
                    </div>
                    <div>
                        <span>
                            <img src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png" 
                            width="60px" style="margin:10px; position:relative;">
                            <span style="font-weight:bold; position:relative; top:-35px;">
                                sejong_univ · 팔로잉
                            </span>
                        </span>
                        <hr style="position:relative; top:-10px; border: 1px lightgray solid;">
                        <div class="modal_right">
                            <div>
                                <img src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png" 
                                width="60px" style="margin:0px 10px; position:relative;">
                                <span style="position:relative; top:-35px;">
                                    <b>
                                        sejong_univ
                                    </b>
                                    &nbsp;${text}
                                </span>
                            </div>
                            <div style="padding-left:85px; position:relative; top:-20px;">
                                <div>
                                    ${long}
                                </div>
                                <br>
                                <div style="color:navy;">
                                    #세종대학교 #세종대
                                </div>
                                <br>
                                <div style="color:gray; font-size:14px;">
                                    ${time}분
                                </div>
                            </div>
                            <div class="show">
                                <!--여기에 댓글 추가됨-->
                            </div>
                        </div>
                        <div style="position:relative;">
                            <hr style="border-top: 2px lightgray solid; margin-bottom:20px;">
                            <div class="icon">
                                <span class="icon_below icon_click">
                                    <img src="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png"
                                    width="30px;" onclick="change(this,${num2});">
                                </span>
                                <span class="icon_below">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2/2043.png" width="30px">
                                </span>
                                <span class="icon_below" style="position:relative">
                                    <img src="https://cdn-icons-png.flaticon.com/512/126/126536.png" width="30px;">
                                </span>
                                <span class="icon_below icon_click" style="float:right; margin-right:20px;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/6165/6165217.png" 
                                    width="25px;" style="position:relative; top:-5px;" onclick="change(this);">
                                </span>
                            </div>
                            <div style="margin:5px 15px; line-height:30px;"> <!--line-height는 줄간격 조정-->
                                <strong> <!--좋아요 숫자 구현-->
                                    좋아요 
                                    <!--(댓글 modal)like_num change-->
                                    <span class="number">${like}</span>개
                                </strong>
                                <div style="font-size:12px; color:gray;">
                                    ${time}분 전
                                </div>
                            </div>
                            <hr style="border: solid 1px gainsboro; margin:15px 0px;">
                            <span style="float:left; margin:0px 15px;">
                                <img src="https://cdn-icons-png.flaticon.com/512/637/637651.png" width="25px;">
                            </span>
                            <form method="get" target="here"> <!--페이지 이동 없이 submit하기(iframe name이 here인 곳으로)-->
                                <input type="text" class="comment comment_text" name="comment" placeholder="댓글 달기..."></input>
                                <input type="submit" value="게시" class="comment_send" onclick="make_comment(${num});"></input>
                            </form>
                            <iframe name="here" style="display:none;"></iframe>
                        </div>
                    </div>
                </div>
                <div class="close_group">
                    <button class="close_comment">X</button>
                </div>
            </div>
        </span>
        <span class="icon_below">
            <img src="https://cdn-icons-png.flaticon.com/512/126/126536.png" width="30px;">
        </span>
        <span class="icon_below icon_click" style="float:right; margin-right:20px;">
            <img src="https://cdn-icons-png.flaticon.com/512/6165/6165217.png" width="25px;" onclick="change(this);">
        </span>
        <div style="margin:0px 15px; line-height:30px;"> <!--line-height는 줄간격 조정-->
            <strong>
                좋아요
                <span class="number">${like}</span>개
                <br> sejong_univ
            </strong>
            ${text}
            <span style="color:gray;">
                더 보기
            </span>
            <div style="font-size:12px; color:gray;">
                ${time}분 전
            </div>
        </div>
        <hr style="border: solid 1px gainsboro; margin:15px 0px;">
        <span style="float:left; margin:0px 15px;">
            <img src="https://cdn-icons-png.flaticon.com/512/637/637651.png" width="25px;">
        </span>
        <form method="post"> <!--action='/~~'(submit 하면 보낼 위치) 넣어야함-->
            <input type="text" class="comment" name="comment" placeholder="댓글 달기..."></input>
            <input type="submit" value="게시" class="comment_send"></input>
        </form>
    </div>
    `
}

/*post clone*/
function cloning(){//함수 없어도 되지만 onload의 pass함수 실행 후 실행되기 위해 선언
    const clone=document.getElementById('clone_post');
    let newPost;
    let i=0;
    for(i=0;i<2;i++){
        if(i==0) newPost=makePost(post_photo1,'1','2','3',like_num1,contents1,long_contents1,time1);
        else newPost=makePost(post_photo2,'2','4','5',like_num2,contents2,long_contents2,time2);
        clone.innerHTML = clone.innerHTML + newPost;
    }
}

/*comment_modal*/
function comment_modal(num){
    const modal_open = document.getElementsByClassName("open_comment"); //class open_comment
    const modal_close = document.getElementsByClassName("close_comment");
    const modalpage = document.getElementsByClassName("modal_group");
    modal_open[num].onclick = function(){
        modalpage[num].style.display = "flex"; //모달창 가운데 오도록
    };
    modal_close[num].onclick = function(){
        modalpage[num].style.display = "none";
    };
}

/*dot modal*/
function dot_modal(num){
    const open_modal = document.getElementsByClassName("open"); /*class open*/
    const close_modal = document.getElementsByClassName("close");
    const modal_page = document.getElementsByClassName("modal_wrapper");
    open_modal[num].onclick = function(){
        modal_page[num].style.display = "flex"; //모달창 가운데 오도록
    };
    close_modal[num].onclick = function(){
        modal_page[num].style.display = "none";
    };
    modal_page[num].onclick=function(){//배경 누르면 모달창 닫히게하기 위함
        modal_page[num].style.display="none";
    };
}
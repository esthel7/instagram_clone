function change_login(){
    const id=document.getElementById("user");
    const pw=document.getElementById("password");
    const button=document.getElementById('login');//login 버튼
    const ground=document.querySelector('.blue_sq');
    if(id.value.indexOf('@') && pw.value.length>=5){
        //id 입력할 때 @입력되었는지, pw 길이가 5 이상인지
        ground.style.backgroundColor="rgb(0, 123, 238)";
        button.style.backgroundColor="rgb(0, 123, 238)";
        button.disabled=false; //버튼 활성화(클릭할 수 있는 상태(id,pw확인절차 필요))
    }
}

function alert_check(button){
    const id=document.getElementById("user");
    const pw=document.getElementById("password");
    if(id.value=='esthel@naver.com' && pw.value=='12345'); //id, pw 맞으면 submit(페이지 이동) 진행
    else {
        alert('Wrong Access');//경고창 출력
        button.disabled=true;//버튼 비활성화(클릭 안되는 상태)
    }
}
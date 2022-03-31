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
const express=require('express');
const app=express();

app.use(express.static('public'));//html파일에서 연결된 css,js파일(public 폴더에 있음) 쓰도록 하기 위함

app.get('/',function(req,res){
    res.sendFile(__dirname + '/instagram_login.html');//html파일 열어주기 위함. __dirname은 약속임
});

app.post('/load',function(req,res){ //로그인폼에서 내용을 post형식으로 보냄(보안 이유)
    res.sendFile(__dirname + '/loading.html');
});

app.get('/check',function(req,res){
    res.sendFile(__dirname + '/save_check.html');
});

app.get('/page',function(req,res){
    res.sendFile(__dirname + '/instagram_page.html');
});

app.listen(3000, function(){ //3000번 포트에서 작동하도록
    console.log('Working!');//성공하면 출력
});
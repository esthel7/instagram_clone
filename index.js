const express=require('express');
const app=express();
const router=require('./router.js');

app.use(express.static('public'));//html파일에서 연결된 css,js파일(public 폴더에 있음) 쓰도록 하기 위함

app.use('/',router);//router 사용하기

app.listen(3000, function(){ //3000번 포트에서 작동하도록
    console.log('Working!');//성공하면 출력
});
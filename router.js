const express=require('express');
const router=express.Router();

const expressSession=require('express-session');

const mysql=require('mysql');
let insta_db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'111111',
    database:'instagram'
});
insta_db.connect();

//만약 라우터 안쓴다면 아래의 router를 app으로 바꿔주면 동작

router.use(express.json());//req.body.user, req.body.pw 사용하기 위함 (body-parser)
router.use(express.urlencoded({extended:true}));//req.body.user, req.body.pw 사용하기 위함
router.use(expressSession({//클라이언트와 서버 사이 세션 사용 위함
    secret:'my key',
    resave:false, //세션 매번 다시 저장
    saveUninitialized:false //아무 내용 없는 session 저장할 것인지
}));

router.get('/',function(req,res){
    res.sendFile(__dirname + '/instagram_login.html');//html파일 열어주기 위함. __dirname은 약속임
});

let user_photo,post_photo=[],contents=[],long_contents=[],like_num=[],time=[];
router.post('/',function(req,res){ //로그인폼에서 내용을 post형식으로 보냄(보안 이유)
    const id=req.body.user;//body-parser 해야 오류x
    const pw=req.body.password;
    if(id && pw){
        insta_db.query(`SELECT * FROM user WHERE email=? AND pw=?`,[id, pw],function(error, result){
            if(error){
                console.log('error');
                throw error;
            }
            if(result.length>0){//로그인 값이 맞다면
                user_photo=result[0].photo;
                insta_db.query(`SELECT * FROM user JOIN post_info ON user.email=post_info.user WHERE user.email=?`,[id],function(error2, results){
                    //user의 email과 post_info의 user가 같다면 results로 결과 반환 (user email이 id인 경우)
                    post_photo[0]=results[0].photo;
                    post_photo[1]=results[1].photo;
                    post_photo[2]=results[2].photo;
                    post_photo[3]=results[3].photo;
                    contents[0]=results[0].contents;
                    contents[1]=results[1].contents;
                    contents[2]=results[2].contents;
                    contents[3]=results[3].contents;
                    long_contents[0]=results[0].long_contents;
                    long_contents[1]=results[1].long_contents;
                    long_contents[2]=results[2].long_contents;
                    long_contents[3]=results[3].long_contents;
                    like_num[0]=results[0].like_num;
                    like_num[1]=results[1].like_num;
                    like_num[2]=results[2].like_num;
                    like_num[3]=results[3].like_num;
                    time[0]=results[0].time;
                    time[1]=results[1].time;
                    time[2]=results[2].time;
                    time[3]=results[3].time;
                });
                req.session.user={//session정보 저장
                    user_email:id,
                    user_pw:pw
                };
                res.redirect('/load');//페이지 이동
            }
            else {              
                res.send(`
                <script>
                    alert("Wrong User");
                    document.location.href="/"; //다시 /로 돌아옴
                </script>
                `);  
            } 
        });
    }
    else{
        res.send(`
        <script>
            alert("Wrong Access");
            document.location.href="/";
        </script>
        `);   
    }
});

router.get('/load',function(req,res){ //로그인폼에서 내용을 post형식으로 보냄(보안 이유)
    if(req.session.user){//로그인 상태라면
        res.sendFile(__dirname + '/loading.html');
    }
    else res.redirect('/');//로그인 안되어있다면
});

router.get('/check',function(req,res){
    if(req.session.user){
        res.sendFile(__dirname + '/save_check.html');
    }
    else res.redirect('/');
});

router.get('/page',function(req,res){
    if(req.session.user){
        //사용자사진, 게시글 사진, 텍스트, 좋아요 수를 page.ejs에 포함시켜야 함
        res.render(__dirname + '/views/instagram_page.ejs', {user:user_photo, //ejs 파일은 sendFile 대신 render 쓰기, user_photo를 'user'로 ejs파일로 보내주기
        photo0:post_photo[0],photo1:post_photo[1],photo2:post_photo[2],photo3:post_photo[3],
        contents0:contents[0],contents1:contents[1],contents2:contents[2],contents3:contents[3],
        long_contents0:long_contents[0],long_contents1:long_contents[1],long_contents2:long_contents[2],long_contents3:long_contents[3],
        like_num0:like_num[0],like_num1:like_num[1],like_num2:like_num[2],like_num3:like_num[3],
        time0:time[0],time1:time[1],time2:time[2],time3:time[3]}
        );
    }
    else res.redirect('/');
});

router.get('/logout',function(req,res){
    if(req.session.user){
        req.session.destroy(function(error){//session내용 없애기
            if(error) throw error;
            res.sendFile(__dirname + '/logout.html');
        });
    }
    else res.redirect('/');
});

module.exports=router;//index.js에서 사용할 수 있도록
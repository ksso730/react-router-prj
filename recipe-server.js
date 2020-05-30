// 라이브러리 로드
const express=require("express")

// 서버생성
const app = express();

// 서버구동
/*
* bind() => IP, PORT 를 연결 => 개통
* listen() => 대기상태
* accept() => 클라이언트가 접속시에 처리
* */
app.listen(3355, ()=>{
    console.log("Server Start ...", "http://localhost:3355")
})

// cross domain
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// 클라이언트 통신
// 사용자  URI => /recipe?page=1
// 몽고디비 연결
// MongoDB Connection

/* java 형식
* MongoClient mc= new MongoClient("localhost", 27107)
* DB db = mc.getDB("mydb")
* DBCollection dbc = db.get()
*/
const Client = require("mongodb").MongoClient;
const URL = "mongodb://211.238.142.181:27017";

app.get('/recipe', (request, response)=>{
    // request => 사용자가 보낸 요청 : page, id, pwd
    // 요청 처리
    // response =>  결과전송
    var page= request.query.page; //request.getParameter("page")
    var rowSize =12;
    var skip = (page*rowSize) - rowSize;
    // 1page => skip=0
    // 2page => skip 12(버림) ==> 13

    Client.connect(URL, (err, client)=>{
        var db = client.db('mydb');
        // SELECT * FROM recipe => find{()}
        // SELECT * FROM recipe WHERE no=1 => find{(no:1)}
        // SELECT * FROM recipe WHERE title => find{()}
        // SELECT * FROM recipe WHERE => find{()}

        // skip => offset 과 비슷함.
        // toArray(err, docs) 콜백 함수: 가져온 데이터를 배열로 묶어줌. (docs에 있음)
        db.collection('recipe').find({}).skip(skip).limit(rowSize)
            .toArray((err, docs)=>{
                response.json(docs);
                console.log(docs);
                client.close();
            });
    })

app.get('/recipe-total', (request, response)=>{
    Client.connect(URL, (err, client)=>{
        var db = client.db('mydb');
        db.collection('recipe').find({}).count((err, count)=>{
            response.json({total: Math.ceil(count/12.0)})
            client.close();
            return count;
        })
    });
})

    // recipe-detail?no=1
app.get('/recipe-detail', (request, response)=>{
    // 파라미터를 받는 방법
    var no = request.query.no;
    Client.connect(URL, (err, client)=>{
        var db = client.db('mydb');
        // 형변환 : Number() or parseInt()
        db.collection('recipe_detail').find({no:Number(no)}).toArray((err, docs)=>{
            response.json(docs[0]);
            client.close();
        })
    });
})






})
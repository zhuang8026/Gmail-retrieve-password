// 引入 express
const express = require('express');

// 建立 web server 物件
const app = express();

var nodemailer = require('nodemailer'); // gmail api 

// 设定router
app.get('/', (req, res)=>{
    // res.send('home'); // 一般传送字串
    res.send('3002 ok !');
    console.log('william-src路径：',__dirname) // C:\xampp\htdocs\iidu-nodejs-f2e\mfee07-nodejs-william\src
});

// ---- top-level middleware ---- start
// 202020519 在 F12/request 查看
// parse application/x-www-form-urlencoded (有此格式就 解析)
app.use(express.urlencoded({ extended: false })); 
// parse application/json (有此格式就 解析)
app.use(express.json());

// 會員gmail api 找回密碼 驗證 
// http://localhost:3002/GmailRetrievePassword
app.post('/GmailRetrievePassword', (req, res)=>{ 
    // const output = {
    //     success: false,
    // }

    let email = req.body.username;
    let randomNum = parseInt(Math.random()*1000000);
    console.log(email)

    let transporter = nodemailer.createTransport({ // 宣告發信物件
        service: 'Gmail',
        // host: 'smtp.gmail.com',
        // port: 465,
        // secure: true,
        auth: {
            // type: 'OAuth2',
            user: 'zhuang8026@gmail.com',
            pass: 'zj199126h',
            // serviceClient: '896736742121-60o5vgegttum1r3oub83ubjlkvhkfbhj.apps.googleusercontent.com',
            // privateKey: 'XYYv27ZXhwKKp5piYdcQdpix',
        }
    });

    let options = {
        //寄件者
        from: 'zhuang8026@gmail.com',
        //收件者
        to: email, 
        //副本
        // cc: 'account3@gmail.com',
        //密件副本
        // bcc: 'account4@gmail.com',
        //主旨
        subject: '這是 node.js 發送的測試信件 - 來自 http://localhost:3002',
        //純文字
        text: '這是 node.js 發送的測試信件 - 來自 http://localhost:3002', // plaintext body
        //嵌入 html 的內文
        html: '<h2>http://localhost:3002</h2> <a href="https://treefonts.com/"> treefonts </a> <img src="https://img1.wsimg.com/isteam/ip/aad4bbdc-98b2-4a8c-8dc9-14912aca6db0/treefonts_logo.png/:/rs=h:400/qt=q:95"><p>驗證碼:'+ randomNum +'</p>', 
        //附件檔案
        // attachments: [ {
        //     filename: 'text01.txt',
        //     content: ''
        // }, {
        //     filename: 'unnamed.jpg',
        //     path: '../public/blogs_img/logo.png'
        // }]
    };

    //發送信件方法
    transporter.sendMail(options, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('訊息發送: ' + info.response);
            res.send('訊息發送: ' + info.response)
        }
    });


    // return res.redirect(303, '/thankyou');

})


// server 侦听
app.listen(3002, ()=>{
    console.log('server started - william use 3002')
})
import express from "express";
import cors from "cors";
import { KakaoClient } from "./kakao.js";
import mongoose from "mongoose";
import passport from "passport";
import axios from "axios";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
mongoose
  .connect("mongodb+srv://jongtae:123456!@cluster0.vsiye3z.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("연결성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/kakao/url", (req, res, next) => {
  console.log("카카오톡 스타트");

  const url = KakaoClient.getAuthCodeURL();
  res.status(200).json({ url });

  console.log("피니쉬");
});

app.post("/login", async (req, res, next) => {
  console.log("/login start");
  try {
    const { code } = req.body;

    const { access_token } = await KakaoClient.getToken(code); // 토큰 받아오기
    const userData = await KakaoClient.getUserData(access_token); // 유저 정보 받아오기

    // 그 후 DB로 사용자 등록 처리
    // 세션 or 토큰 처리
    // 등등 로그인 관련 처리를 해줘야 함

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);

    const errorData = {
      message: "Internal server error.. :(",
    };
    res.status(500).json(errorData);
  }

  console.log("/login finish");
});

// app.get("/naver", passport.authenticate("naver", { authType: "reprompt" }));

// app.get(
//   "/naver/callback",
//   passport.authenticate("naver", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

var client_id = "o7JAllsCI0ZDIaDfAXip";
var client_secret = "TzkBaeljLL";
var state = "RAMDOM_STATE";
var redirectURI = encodeURI("http://localhost:3000/callbak/naver");
var api_url = "";
app.get("/naverlogin", function (req, res) {
  api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    client_id +
    "&redirect_uri=" +
    redirectURI +
    "&state=" +
    state;
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end(
    "<a href='" +
      api_url +
      "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
});
app.get("/callback", function (req, res) {
  code = req.query.code;
  state = req.query.state;
  api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&redirect_uri=" +
    redirectURI +
    "&code=" +
    code +
    "&state=" +
    state;
  // var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  axios.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

export default app;

import axios from "axios";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  kakaoId: String,
  nickname: String,
  email: String,
});

const User = mongoose.model("Userss", userSchema);

class Kakao {
  constructor() {
    this.key = process.env.KAKAO_KEY;
    console.log(4, process.env.KAKAO_KEY);
    this.redirectUri = `http://localhost:3000/callback/kakao`;
  }

  getAuthCodeURL() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.key}&redirect_uri=${this.redirectUri}&response_type=code`;
  }

  async getToken(code) {
    const params = {
      client_id: this.key,
      code,
      grant_type: "authorization_code",
      redirect_uri: this.redirectUri,
    };

    const { data } = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }, // 👈 헤더 설정
      }
    );
    console.log(data);
    const tokenData = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };

    return tokenData;
  }
  async getUserData(token) {
    const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const existingUser = await User.findOne({ kakaoId: data.id });
    if (existingUser) {
      // 이미 등록된 사용자인 경우, 정보 업데이트
      existingUser.nickname = data.properties.nickname;
      // existingUser.email = userInfo.kakao_account.email;
      await existingUser.save();
      console.log("ㅎㅇㅎㅇ");
      return { nickname: existingUser.nickname };
    } else {
      // 등록되지 않은 사용자인 경우, 새로 등록
      const newUser = new User({
        kakaoId: data.id,
        nickname: data.properties.nickname,
        // email: userInfo.kakao_account.email,
      });
      await newUser.save();
      return { nickname: newUser.nickname };
    }
    console.log("data", data.id);

    const userData = {
      nickname: data,
    };

    return userData;
  }
}

export const KakaoClient = new Kakao();

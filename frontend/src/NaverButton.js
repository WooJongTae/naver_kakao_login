// import React, { useEffect } from "react";

// const NaverLogin = () => {
//   useEffect(() => {
//     const script1 = document.createElement("script");
//     script1.src =
//       "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
//     script1.async = true;
//     document.body.appendChild(script1);

//     const script2 = document.createElement("script");
//     script2.src = "http://code.jquery.com/jquery-1.11.3.min.js";
//     script2.async = true;
//     document.body.appendChild(script2);

//     return () => {
//       document.body.removeChild(script1);
//       document.body.removeChild(script2);
//     };
//   }, []);

//   useEffect(() => {
//     if (window.naver_id_login) {
//       const naver_id_login = new window.naver_id_login(
//         "o7JAllsCI0ZDIaDfAXip",
//         "http://localhost:3000/callbak/naver"
//       );
//       const state = naver_id_login.getUniqState();
//       naver_id_login.setButton("white", 2, 40);
//       naver_id_login.setDomain("http://localhost:3000");
//       naver_id_login.setState(state);
//       naver_id_login.setPopup();
//       naver_id_login.init_naver_id_login();

//       // 네이버 사용자 프로필 조회
//       const naverSignInCallback = () => {
//         alert(naver_id_login.getProfileData("email"));
//         alert(naver_id_login.getProfileData("nickname"));
//         alert(naver_id_login.getProfileData("age"));
//       };

//       naver_id_login.get_naver_userprofile(naverSignInCallback);
//     }
//   }, []);

//   return <div id="naver_id_login"></div>;
// };

// export default NaverLogin;
import React, { useEffect } from "react";

const NaverButton = () => {
  useEffect(() => {
    if (window.naver_id_login) {
      let naver_id_login = new naver_id_login(
        "o7JAllsCI0ZDIaDfAXip",
        "http://localhost:3000/callbak/naver"
      );
      let state = naver_id_login.getUniqState();
      naver_id_login.setButton("white", 2, 40);
      naver_id_login.setDomain("http://localhost:3000");
      naver_id_login.setState(state);
      naver_id_login.setPopup();
      naver_id_login.init_naver_id_login();
    }
  }, []);

  return <div id="naver_id_login"></div>;
};

export default NaverButton;

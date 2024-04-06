import axios from "axios";

function KakaoButton() {
  const fetchGetURL = async () => {
    try {
      const response = await axios.get("http://localhost:3001/kakao/url");
      const { url } = response.data;

      console.log(url); // 응답으로 온 url

      document.location.href = url;
    } catch (error) {
      alert("에러 발생");
      console.error(error);
    }
  };
  return (
    <button className="kakao" onClick={fetchGetURL}>
      카카오 로그인하기
    </button>
  );
}

export default KakaoButton;

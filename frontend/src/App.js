import "./App.css";
import KakaoButton from "./KakaoButton";
import NaverLogin from "./NaverButton";

function App() {
  return (
    <div className="App">
      {/* 추후 버튼 컴포넌트 */}
      <NaverLogin />
      <KakaoButton />
      <h1>1241</h1>
    </div>
  );
}

export default App;

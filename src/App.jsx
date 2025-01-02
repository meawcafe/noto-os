import WindowContainer from "./components/WindowContainer";

function App() {
  return (
    <div className="flex-col overflow-hidden w-screen h-screen rounded-[0.6rem] - white-theme alert-colors">
      <WindowContainer>
        <iframe
          src={`https://www.youtube.com/embed/${
            ["ruCZwFwPX7I", "ZRsJH6De6nI"][Math.floor(Math.random() * 2)] // u should hear dis :D
          }?autoplay=0`}
          allow="autoplay"
          style={{
            width: "100%",
            height: "100%",
            display: "inline-block",
            border: "none",
          }}
        />
      </WindowContainer>
    </div>
  );
}

export default App;

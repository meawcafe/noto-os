import WindowContainer from "./components/WindowContainer";

function App() {
  return (
    <div
      className="white-theme alert-colors"
      style={{
        flexDirection: "column",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        borderRadius: "0.6rem",
        backgroundColor: "var(--background3)",
      }}
    >
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

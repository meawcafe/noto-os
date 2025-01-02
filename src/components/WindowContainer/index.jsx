import { useCallback, useRef } from "react";
import ResizeBracket from "./ResizeBracket";
import ResizeCorner from "./ResizeCorner";

export default function WindowContainer({
  children,
  minHeight = 314,
  minWidth = 500,
}) {
  const windowRef = useRef(null);

  const changeIframeInteractions = ({ enable = false }) => {
    // enable or disable pointer events on iframes cuz iframes steal focus
    document.querySelectorAll("iframe").forEach((iframe) => {
      iframe.style.pointerEvents = enable ? "auto" : "none";
      iframe.style.opacity = enable ? 1 : 0.5;
    });
  };

  const handleWindowMove = (e) => {
    console.log("moving");
    const { x, y } = windowRef.current.getBoundingClientRect();
    windowRef.current.style.left = `${x + e.movementX}px`;
    windowRef.current.style.top = `${y + e.movementY}px`;
  };

  const stopDragging = useCallback(() => {
    console.log("stopped");
    window.removeEventListener("mousemove", handleWindowMove);
    window.removeEventListener("mouseup", stopDragging);

    document.documentElement.style.cursor = "auto";

    // re-enable pointer events on iframes
    changeIframeInteractions({ enable: true });
  }, []);

  const startDragging = useCallback(() => {
    console.log("clicked");
    window.addEventListener("mousemove", handleWindowMove);
    document.documentElement.style.cursor = "move";

    // disable pointer events on iframes to prevent stealing focus
    changeIframeInteractions({ enable: false });

    // stop dragging when mouse is released
    window.addEventListener("mouseup", stopDragging);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "red",
        position: "absolute",

        display: "flex",
        flexDirection: "column",

        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
        width: `${minWidth}px`,
        height: `${minHeight}px`,
      }}
      ref={windowRef}
    >
      {/* TODO: container */}
      <div
        style={{
          backgroundColor: "pink",
          display: "flex",
          flexDirection: "column",
          position: "relative",

          width: "100%",
          height: "100%",
        }}
      >
        {/* TODO: header */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "2rem",
              width: "100%",
              backgroundColor: "blue",
            }}
            onMouseDown={startDragging}
          >
            header
          </div>
        </div>

        {/* TODO: content */}
        <div
          style={{
            backgroundColor: "green",
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>

        {/* TODO: resize window BRACKET */}
        <ResizeBracket
          width="100%"
          height="0.6rem"
          top="calc(0% + -0.6rem)"
          orientation="top"
          {...{
            minHeight,
            minWidth,
            windowRef,
            changeIframeInteractions,
          }}
        />

        <ResizeBracket
          width="100%"
          height="0.6rem"
          top="100%"
          orientation="bottom"
          {...{
            minHeight,
            minWidth,
            windowRef,
            changeIframeInteractions,
          }}
        />

        <ResizeBracket
          width="0.6rem"
          height="100%"
          right="100%"
          orientation="left"
          {...{
            minHeight,
            minWidth,
            windowRef,
            changeIframeInteractions,
          }}
        />

        <ResizeBracket
          width="0.6rem"
          height="100%"
          right="calc(0% + -0.6rem)"
          orientation="right"
          {...{
            minHeight,
            minWidth,
            windowRef,
            changeIframeInteractions,
          }}
        />
      </div>

      {/* TODO: resize window CORNER */}

      <ResizeCorner
        top="-0.6rem"
        right="-0.6rem"
        orientation="top-right"
        {...{
          minHeight,
          minWidth,
          windowRef,
          changeIframeInteractions,
        }}
      />

      <ResizeCorner
        orientation="top-left"
        top="-0.6rem"
        right="calc(100% + -0.4rem)"
        {...{
          minHeight,
          minWidth,
          windowRef,
          changeIframeInteractions,
        }}
      />

      <ResizeCorner
        orientation="bottom-right"
        top="calc(100% + -0.4rem)"
        right="-0.6rem"
        {...{
          minHeight,
          minWidth,
          windowRef,
          changeIframeInteractions,
        }}
      />

      <ResizeCorner
        orientation="bottom-left"
        top="calc(100% + -0.4rem)"
        right="calc(100% + -0.4rem)"
        {...{
          minHeight,
          minWidth,
          windowRef,
          changeIframeInteractions,
        }}
      />
    </div>
  );
}

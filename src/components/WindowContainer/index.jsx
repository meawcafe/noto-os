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
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
        width: `${minWidth}px`,
        height: `${minHeight}px`,
      }}
      className={`bg-red-500 absolute flex flex-col`}
      ref={windowRef}
    >
      {/* TODO: container */}
      <div className="bg-pink-400 flex flex-col w-full h-full relative">
        {/* TODO: header */}
        <div>
          <div
            className="flex justify-between items-center h-8 w-full bg-blue-400"
            onMouseDown={startDragging}
          >
            header
          </div>
        </div>

        {/* TODO: content */}
        <div className="bg-green-400 flex-grow w-full h-full">{children}</div>

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
    </div>
  );
}

import { useCallback } from "react";

export default function ResizeBracket({
  width,
  height,
  top,
  right,
  orientation,

  windowRef,
  minHeight,
  minWidth,
  changeIframeInteractions,
}) {
  const handleWindowResize = (e) => {
    const { clientX, clientY } = e;
    const { x, y, width, height } = windowRef.current.getBoundingClientRect();
    console.log("resizing");
    console.log("clientX", clientX);
    console.log("clientY", clientY);

    const calculateSize = (
      clientX,
      clientY,
      x,
      y,
      width,
      height,
      orientation
    ) => {
      let newWidth,
        newHeight,
        newLeft = null,
        newTop = null;

      switch (orientation) {
        case "top":
          newHeight = height - (clientY - y);
          newTop = clientY;
          break;
        case "left":
          newWidth = width - (clientX - x);
          newLeft = clientX;
          break;
        case "bottom":
          newHeight = clientY - y;
          break;
        case "right":
          newWidth = clientX - x;
          break;
        default:
          return;
      }

      // apply minimum size constraints only if the new size is valid
      if (newHeight >= minHeight) {
        windowRef.current.style.height = newHeight + "px";
        if (newTop !== null) windowRef.current.style.top = newTop + "px";
      }

      if (newWidth >= minWidth) {
        windowRef.current.style.width = newWidth + "px";
        if (newLeft !== null) windowRef.current.style.left = newLeft + "px";
      }
    };

    calculateSize(clientX, clientY, x, y, width, height, orientation);
  };

  const stopResizing = useCallback(() => {
    console.log("stopped resize");
    window.removeEventListener("mousemove", handleWindowResize);
    window.removeEventListener("mouseup", stopResizing);

    // re-enable pointer events on iframes
    changeIframeInteractions({ enable: true });
  }, []);

  const startResizing = useCallback(() => {
    console.log("clicked resize");
    window.addEventListener("mousemove", handleWindowResize);
    // stop resizing when mouse is released
    window.addEventListener("mouseup", stopResizing);

    // disable pointer events on iframes to prevent stealing focus
    changeIframeInteractions({ enable: false });
  }, []);

  return (
    <div
      className={`absolute bg-yellow-200 cursor-${
        orientation === "top" || orientation === "bottom" ? "ns" : "ew"
      }-resize`}
      style={{
        width,
        height,
        top,
        right,
      }}
      onMouseDown={startResizing}
    ></div>
  );
}

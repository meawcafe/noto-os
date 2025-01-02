import { useCallback } from "react";

export default function ResizeCorner({
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
        case "top-right":
          newHeight = height - (clientY - y);
          newWidth = clientX - x;
          newTop = clientY;
          break;
        case "bottom-right":
          newHeight = clientY - y;
          newWidth = clientX - x;
          break;
        case "bottom-left":
          newHeight = clientY - y;
          newWidth = width - (clientX - x);
          newLeft = clientX;
          break;
        case "top-left":
          newHeight = height - (clientY - y);
          newWidth = width - (clientX - x);
          newTop = clientY;
          newLeft = clientX;
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
      className={`absolute w-4 h-4 bg-red-500 cursor-${
        orientation === "top-left" || orientation === "bottom-right"
          ? "nwse"
          : "nesw"
      }-resize`}
      style={{
        top,
        right,
      }}
      onMouseDown={startResizing}
    />
  );
}

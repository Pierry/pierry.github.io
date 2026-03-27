import { useEffect } from "react";

const DevSimulator = () => {
  useEffect(() => {
    // Hide scrollbars for fullscreen game experience
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#141820]">
      <iframe
        src="https://itch.io/embed-upload/16819555?color=141820"
        className="w-full h-full border-0"
        allowFullScreen
        title="Dev Simulator"
        allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated; web-share"
      />
    </div>
  );
};

export default DevSimulator;

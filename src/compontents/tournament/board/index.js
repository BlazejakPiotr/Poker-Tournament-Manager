import { useEffect, useState } from "react";

export const CurrentLocalTime = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  return (
    <>
      <p>Current time</p>
      <h2>{currentTime}</h2>
    </>
  );
};

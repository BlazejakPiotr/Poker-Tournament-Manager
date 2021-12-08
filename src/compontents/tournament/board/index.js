import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

export const TournamentElapsedTime = () => {
  const status = useSelector((state) => state.tournament.data.state.status);
  const [elapsedTime, setElapsedTime] = useState(0);
  let secondsElapsed = 0;

  useEffect(() => {
    if (status === "Running") {
      setInterval(() => {
        setElapsedTime((secondsElapsed += 1));
      }, 1000);
    }
  }, []);

  return (
    <>
      <p>Elapsed time</p>
      <h2>{elapsedTime}</h2>
    </>
  );
};

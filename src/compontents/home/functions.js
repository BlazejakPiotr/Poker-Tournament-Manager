export const calculateNumberOfRounds = (duration, roundLength) => {
  const tournamentDurationMinutes = duration * 60;
  const numberOfRounds = tournamentDurationMinutes / roundLength;
  return numberOfRounds;
};

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CreateNewRound = () => {
  const dispatch = useDispatch();
  const rounds = useSelector((state) => state.tournament.rounds);
  const [round, setRound] = useState({
    //   name: rounds.length + 1,
  });
};

import { faCheck, faChevronRight } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  bustoutPlayer,
  buyinPlayer,
  editPlayer,
  rebuyPlayer,
  removePlayer,
  setShowRoundsModal,
  setTournamentDuration,
  TOURNAMENT_STATUS,
} from "../../../redux/actions";
import { useInterval } from "../clock/functions";
import { LevelModal } from "../levels";
import { setPlayerStatusBadge } from "../players/index";

export const CurrentLocalTime = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  return currentTime;
};

export const TournamentElapsedTime = () => {
  const status = useSelector((state) => state.tournament.data.state.status);
  const dispatch = useDispatch();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [elapsedHours, setElapsedHours] = useState(0);

  useInterval(
    () => {
      if (elapsedSeconds < 60) {
        setElapsedSeconds(elapsedSeconds + 1);
      }
      if (elapsedSeconds === 59) {
        setElapsedSeconds(0);
        setElapsedMinutes(elapsedMinutes + 1);
      }
      if (elapsedMinutes === 60) {
        setElapsedHours(elapsedHours + 1);
      }
    },
    status === TOURNAMENT_STATUS.LIVE ? 1000 : null
  );

  useEffect(() => {
    dispatch(
      setTournamentDuration({
        hours: elapsedHours,
        minutes: elapsedMinutes,
        seconds: elapsedSeconds,
      })
    );
  }, [elapsedMinutes]);

  return (
    <>
      {`${elapsedHours < 10 ? "0" + elapsedHours : elapsedHours}:${
        elapsedMinutes < 10 ? "0" + elapsedMinutes : elapsedMinutes
      }:${elapsedSeconds < 10 ? "0" + elapsedSeconds : elapsedSeconds}`}
    </>
  );
};

export const LevelsTable = () => {
  const blinds = useSelector((state) => state.tournament.blinds);
  const currentLevel = useSelector(
    (state) => state.tournament.data.state.currentRound
  );
  return (
    <>
      <Table
        striped
        borderless
        responsive
        hover
        variant="dark"
        className="m-0 scrollable-content"
      >
        <thead>
          <tr style={{ borderTop: "2px solid #212529" }}>
            <th style={{backgroundColor: "#1c1814"}}></th>
            <th style={{backgroundColor: "#1c1814", textAlign: "left"}}>#</th>
            <th style={{backgroundColor: "#1c1814"}}>
              Ante
            </th>
            <th style={{backgroundColor: "#1c1814"}}>SB</th>
            <th style={{backgroundColor: "#1c1814"}}>BB</th>
            <th style={{backgroundColor: "#1c1814"}}>
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {blinds.map((round, index) => (
            <LevelsTableItem
              index={index}
              round={round}
              key={index}
              currentLevel={currentLevel}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export const LevelsTableItem = ({ index, round, currentLevel }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.rounds);
  return (
    <>
      <tr
        onClick={() => dispatch(setShowRoundsModal(!modal, round, index))}
        className={index === currentLevel ? "currentLevel" : ""}

      >
        <td style={{width: "5%"}}>
          {index === currentLevel && <FontAwesomeIcon icon={faChevronRight} />}
        </td>
        <td style={{width:"20%", textAlign: "left"}}>{round.break ? "Break" : "Round " + (index + 1)}</td>
        <td style={{width: "15%"}}>{round.ante ?? "-"}</td>
        <td style={{width: "15%"}}>{round.sb}</td>
        <td style={{width: "15%"}}>{round.bb}</td>
        <td style={{width: "15%"}}>
          {round.duration} <small>min</small>
        </td>
      </tr>
      {/* <LevelModal round={round} index={index} /> */}
    </>
  );
};

export const PlayersTable = () => {
  const players = useSelector((state) => state.tournament.players);
  return (
    <Table
      striped
      borderless
      hover
      variant="dark"
      className="m-0 scrollable-content"
      style={{ border: "0px" }}
    >
      <thead>
        <tr style={{ borderTop: "2px solid #212529" }}>
          <th style={{ textAlign: "left" }}>Name</th>
          <th>Buyin</th>
          <th>Rebuy</th>
          <th>Cost</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <PlayersTableItem key={index} index={index} player={player} />
        ))}
      </tbody>
    </Table>
  );
};

export const PlayersTableItem = ({ index, player }) => {
  const tournament = useSelector((state) => state.tournament);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(!showModal);

  const [playerState, setPlayerState] = useState({
    ...player,
    name: player.name,
  });
  const handleInput = (e) => {
    setPlayerState({
      ...playerState,
      name: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPlayer(index, playerState));
  };

  const handleBuyin = () => {
    dispatch(buyinPlayer(index));
    handleShowModal();
  };

  const handleRebuy = () => {
    dispatch(rebuyPlayer(index));
    handleShowModal();
  };

  const handleBustOut = () => {
    dispatch(bustoutPlayer(index));
    handleShowModal();
  };

  return (
    <>
    <tr onClick={handleShowModal}>
      <td style={{ textAlign: "left" }}>{player.name}</td>
      <td>{player.buyin ? <FontAwesomeIcon icon={faCheck} /> : "-"}</td>
      <td>{player.rebuy}</td>
      <td>{player.cost} {tournament.data.currency}</td>
      <td>{setPlayerStatusBadge(player.status)}</td>
    </tr>
    <Modal show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Manage player</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col xs={8}>
                <Col>
                  <FormGroup className="d-flex align-items-center mb-2">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Add new player"
                      required
                      style={{ margin: "0px 1rem" }}
                      value={playerState.name}
                      onChange={(e) => handleInput(e)}
                    />
                  </FormGroup>
                </Col>
                <Row>
                  <Col xs={5}>
                    <ul
                      style={{
                        paddingInline: "0px",
                        lineHeight: "2rem",
                        listStyle: "none",
                      }}
                    >
                      <li className="d-flex justify-content-between">
                        <Col xs={10}>Buy-in</Col>
                        <Col>
                          {player.buyin && <FontAwesomeIcon icon={faCheck} />}
                        </Col>
                      </li>
                      <li className="d-flex justify-content-between">
                        <Col xs={10}>Rebuy </Col>
                        <Col>{player.rebuy > 0 && player.rebuy}</Col>
                      </li>
                    </ul>
                  </Col>
                  <Col>
                    <ul
                      style={{
                        paddingInline: "0px",
                        lineHeight: "2rem",
                        listStyle: "none",
                      }}
                    >
                      <li className="d-flex justify-content-between align-items-center">
                        Status
                        {setPlayerStatusBadge(player.status)}
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <Col>Place</Col>
                        <Col>{player.place}</Col>
                      </li>
                      <li className="d-flex justify-content-between">
                        <Col>Total cost </Col>
                        <Col className="d-flex justify-content-end">
                          {player.cost} {tournament.data.currency}
                        </Col>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>

              <Col xs={4}>
                <Button
                  variant="danger"
                  onClick={handleBuyin}
                  className="w-100 mb-2"
                  disabled={player.buyin ? true : false}
                >
                  Buy-in
                </Button>
                <Button
                  variant="danger"
                  onClick={handleRebuy}
                  className="w-100 mb-2"
                  disabled={!tournament.data.rebuy || player.place}
                >
                  Rebuy
                </Button>

                <Button
                  variant="danger"
                  disabled={!player.buyin || player.status === "Busted out"}
                  onClick={handleBustOut}
                  className="w-100 mb-2"
                >
                  Bust out
                </Button>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              variant="seconadry"
              className="btn-delete"
              disabled={player.buyin}
              onClick={() => dispatch(removePlayer(index))}
            >
              Delete
            </Button>
            <Button
              variant="danger"
              onSubmit={() => handleShowModal(showModal)}
            >
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export const PrizesTable = () => {
  const data = useSelector((state) => state.tournament.data);

  return (
    <Table
      striped
      borderless
      hover
      variant="dark"
      className="m-0 scrollable-content"
      style={{ border: "0px" }}
    >
      <thead>
        <tr style={{ borderTop: "2px solid #212529" }}>
          <th style={{ textAlign: "left" }}>Place</th>
          <th>Winnings</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ textAlign: "left" }}>1st</td>
          <td>50 EUR</td>
          <td>50%</td>
        </tr>
      </tbody>
    </Table>
  );
};

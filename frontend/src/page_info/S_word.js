import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import useStore from "../for_game/store";

import useSound from "use-sound";

import good_sound from "../audio/good.mp3";
import bad_sound from "../audio/bad.mp3";
import "./S_word.css";
function S_words() {
  let [show, setShow] = useState([]);

  const { cnt_answer, set_CntAns, cur_session, cur_turn_states, cur_round } =
    useStore();
  const {
    is_my_turn,
    cur_who_turn,
    my_index,
    setPublishAudio,
    myUserID,
    gamers,
    cur_teller,
  } = useStore();
  const { gamerWords, fetchGamerWords } = useStore();
  //ZUSTAND

  const [good] = useSound(good_sound);
  const [bad] = useSound(bad_sound);
  //USE Sound

  let [show_name, setShow_name] = useState("--------");
  const [answer, setAnswer] = useState("");

  let [number, setNumber] = useState(cnt_answer);

  const [showIndex, setShowIndex] = useState(0);
  const { is_my_team_turn, set_myteam_turn } = useStore();
  const { pass_cnt, set_pass_cnt } = useStore();
  useEffect(async () => {
    if (cur_round !== 0) {
      setShow([]);
      await fetchGamerWords();
    }
  }, [cur_teller]);

  useEffect(() => {
    setShow(show.concat(gamerWords.map((a) => a.name)));
    console.log("show time");
    console.log(show[showIndex]);
  }, [gamerWords]);

  useEffect(() => {
    setShow_name(show[showIndex]);
  }, [show]);

  useEffect(() => {
    setNumber(cnt_answer);
  }, [cnt_answer]);
  useEffect(() => {
    if (number !== 0) {
      sendScore();
      if (showIndex < show.length - 1) {
        nextShow();
        good();
      }
    }
  }, [number]);

  useEffect(() => {
    console.log("누구 턴 ? :", cur_who_turn);
    console.log("내 인덱스 :", my_index);
    if (my_index % 2 === 0 && cur_who_turn === "red") {
      set_myteam_turn(true);
      console.log("내 팀 레드 맞음");
    } else if (my_index % 2 === 1 && cur_who_turn === "blue") {
      set_myteam_turn(true);
      console.log("내 팀 블루 맞음");
    } else {
      set_myteam_turn(false);
      console.log("현재 우리 팀 턴 아님");
    }
  }, [cur_who_turn]);

  useEffect(() => {
    console.log("내 팀 차례인가? ", is_my_team_turn);
  });
  useEffect(() => {}, [is_my_team_turn]);
  const nextShow = () => {
    setShowIndex(showIndex + 1);
    setShow_name(show[showIndex + 1]);
  };
  const pass_question = () => {
    const message = {
      pass_cnt: pass_cnt + 1,
    };
    cur_session.signal({
      type: "pass",
      data: JSON.stringify(message),
    });
  };

  useEffect(() => {
    if (pass_cnt > 0) {
      console.log("pass_cnt 변경", pass_cnt);
      nextShow();
    }
  }, [pass_cnt]);

  const sendScore = () => {
    const message = {
      score: number,
    };
    cur_session.signal({
      type: "score",
      data: JSON.stringify(message),
    });
  };

  const check_Score = (e) => {
    if (show_name === answer) {
      set_CntAns(cnt_answer + 1);
      setAnswer("");
    } else {
      bad();
      setAnswer("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      check_Score(e);
    }
  };
  return (
    <>
      {is_my_team_turn && cur_turn_states === "game" && (
        // <button
        //   className="btn-15"
        //   onClick={() => {
        //     pass_question();
        //   }}
        // >
        //   Pass
        // </button>
        <button class="w-btn w-btn-gra1" type="button" onClick={pass_question}>
          PASS
        </button>
      )}
      {(is_my_turn || !is_my_team_turn) && cur_turn_states === "game" && (
        <h5>{show_name}</h5>
      )}
      {/* 내 턴이거나 내 팀 턴이 아닐경우에만 문제를 띄움 */}
      {!is_my_turn && is_my_team_turn && (
        // 내 턴이 아니고 우리팀 턴일 경우(이야기꾼을 제외한 나머지)
        <>
          <input
            id="Answer_input"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyPress(e);
            }}
          />
          <Button
            type="submit"
            onClick={() => {
              check_Score();
            }}
          >
            제출
          </Button>
        </>
      )}
    </>
  );
}

export default S_words;

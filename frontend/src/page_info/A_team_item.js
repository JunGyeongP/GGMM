import React, { useState, useEffect } from "react";
import useStore from "../for_game/store";

function AteamItem() {
  const {
    cur_session,
    AItem1,
    AItem2,
    AItem3,
    AsignalSent1,
    AsignalSent2,
    AsignalSent3,
    my_index,
    is_my_team_turn,
    cur_who_turn,
    cur_turn_states,
  } = useStore();

  const sendItem1 = () => {
    if (!AsignalSent1) {
      // set_AItem1(true)
      console.log("여기는 시그널을 보내는 곳 : ", AItem1);
      const message = {
        AItem1: true,
        // AsignalSent1: false,
      };

      cur_session &&
        cur_session.signal({
          type: "AItem1",
          data: JSON.stringify(message),
        });

      setTimeout(() => {
        const message = {
          AItem1: false,
        };

        cur_session &&
          cur_session.signal({
            type: "AItem1",
            data: JSON.stringify(message),
          });
      }, 10000);
    }
  };

  const sendItem2 = () => {
    if (!AsignalSent2) {
      // set_AItem2(true)
      console.log("여기는 시그널을 보내는 곳 : ", AItem2);
      const message = {
        AItem2: true,
        // AsignalSent2: false,
      };

      cur_session &&
        cur_session.signal({
          type: "AItem2",
          data: JSON.stringify(message),
        });

      setTimeout(() => {
        const message = {
          AItem2: false,
        };

        cur_session &&
          cur_session.signal({
            type: "AItem2",
            data: JSON.stringify(message),
          });
      }, 10000);
    }
  };

  const sendItem3 = () => {
    if (!AsignalSent3) {
      // set_AItem3(true)
      console.log("여기는 시그널을 보내는 곳 : ", AItem3);
      const message = {
        AItem3: true,
        // AsignalSent3: false,
      };

      cur_session &&
        cur_session.signal({
          type: "AItem3",
          data: JSON.stringify(message),
        });

      setTimeout(() => {
        const message = {
          AItem3: false,
        };

        cur_session &&
          cur_session.signal({
            type: "AItem3",
            data: JSON.stringify(message),
          });
      }, 10000);
    }
  };

  useEffect(() => {}, is_my_team_turn);
  return (
    <>
      {my_index % 2 === 0 && is_my_team_turn === false ? (
        <>
          <button
            className="image-button_blur"
            onClick={() => {
              sendItem1();
            }}
          >
            {" "}
          </button>
          <button
            className="image-button_mirr"
            onClick={() => {
              sendItem2();
            }}
          ></button>
          <button
            className="image-button_4div"
            onClick={() => {
              sendItem3();
            }}
          ></button>
        </>
      ) : null}
    </>
  );
}

export default AteamItem;

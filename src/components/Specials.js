import React, { useContext, useEffect, useState } from "react";
import S0 from "../Rails/S0";
import S1 from "../Rails/S1";
import S2 from "../Rails/S2";
import S3 from "../Rails/S3";
import S4 from "../Rails/S4";
import S5 from "../Rails/S5";
import "./Specials.css";
import Piece from "./Piece";
import Moving from "../data/Moving";

function SPECIALS() {
  return [
    {
      name: "S0",
      item: <S0 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "S1",
      item: <S1 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "S2",
      item: <S2 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "S3",
      item: <S3 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "S4",
      item: <S4 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
    {
      name: "S5",
      item: <S5 />,
      rotated: 0,
      flip: 0,
      round: 0,
    },
  ];
}

const Specials = () => {
  const { round } = useContext(Moving);
  const [specials, setSpecials] = useState("");

  useEffect(() => {
    let NewSpecials = new SPECIALS();
    for (let i = 0; i < NewSpecials.length; i++) {
      NewSpecials[i].round = round;
    }

    setSpecials(NewSpecials);
  }, [round]);

  return (
    <div id="Specials">
      {specials !== "" ? specials.map((special, index) => <Piece key={`${round}${index}`} piece={special}/>) : ""}
    </div>
  );
};

export default Specials;

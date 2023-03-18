import React, {useContext} from 'react'
import S0 from "../Rails/S0"
import S1 from "../Rails/S1"
import S2 from "../Rails/S2"
import S3 from "../Rails/S3"
import S4 from "../Rails/S4"
import S5 from "../Rails/S5"
import "./Specials.css";
import Moving from "../Rails/Moving"

const Specials = () => {
    const { SetSelected, selected } = useContext(Moving);
    const SPECIALS = [
        {
            name: "S0",
            item: <S0 />
        },
        {
            name: "S1",
            item: <S1 />
        },
        {
            name: "S2",
            item: <S2 />
        },
        {
            name: "S3",
            item: <S3 />
        },
        {
            name: "S4",
            item: <S4 />
        },
        {
            name: "S5",
            item: <S5 />
        },
    ];

    const chooseItem = (item) => {
        SetSelected(item);
    }

  return (
    <div id="Specials">
        {
            SPECIALS.map((special, index) => (
                <div key={index} className="SpecialItem" onClick={() => chooseItem(special.item)} >{special.item}</div>
            ))
        }
     {selected}
    </div>
  )
}

export default Specials
import { createContext, useState } from "react";

const Moving = createContext();

export function MovingManage({ children }) {
    const [selected, useSelected] = useState("");

    const SetSelected = (newest) => {
        useSelected(AnalyseSelected(newest));

    }

    const AnalyseSelected = (newest) => {
        if (newest.name === selected.name){
            return "";
        } else {
            return newest;
        }
    } 

    const UnselectTheSelectedPiece = () => {
        useSelected("");
    }

    

    return (
        <Moving.Provider 
        value={{
            selected, 
            SetSelected,
            UnselectTheSelectedPiece
        }}
        >
            {children}
        </Moving.Provider>
    )
}

export default Moving;
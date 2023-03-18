import { createContext, useState } from "react";

const Moving = createContext();

export function MovingManage({ children }) {
    const [selected, useSelected] = useState("null");

    const SetSelected = (newest) => {
        
        useSelected(AnalyseSelected(newest));

    }

    const AnalyseSelected = (newest) => {
        if (newest.name === selected.name){
            return "null";
        } else {
            return newest;
        }
    } 

    const UnselectTheSelectedPiece = () => {
        useSelected("null");
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
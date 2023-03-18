import { createContext, useState } from "react";

const Moving = createContext();

export function MovingManage({ children }) {
    const [selected, useSelected] = useState("");

    const SetSelected = (e) => {
        useSelected(e);
    }

    return (
        <Moving.Provider 
        value={{
            selected, 
            SetSelected
        }}
        >
            {children}
        </Moving.Provider>
    )
}

export default Moving;
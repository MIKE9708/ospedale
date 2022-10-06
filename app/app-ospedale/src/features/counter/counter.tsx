import { useState } from "react";
import { increment,decrement } from "./counterSlice";
import { useAppSelector,useAppDispatch } from "../../redux/hooks";

export function Counter(){

    const count=useAppSelector((state)=>state.counter.value);
    const dispatch=useAppDispatch();

    return (
        <div>Prova
            {count}
        </div>
    )
}
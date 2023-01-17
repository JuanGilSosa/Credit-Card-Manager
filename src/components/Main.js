import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchService } from "../services/fetchService";
import { startGetMes, startSetMes } from "../store/action/actionMes";
import { History } from "./History";
import { Manager } from "./Manajer";

export const Main = () => {
    const dispatch = useDispatch();

    fetchService('/purchase/getall')
        .then(res => {
            if (res.ok) {
                dispatch(startSetMes(res.data));
                dispatch(startGetMes());
            }
        });

    return (
        <Manager />
    )
}
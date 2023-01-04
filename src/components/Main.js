import { useDispatch } from "react-redux";
import { fetchService } from "../services/fetchService";
import { startGetMes, startSetMes } from "../store/action/actionMes";
import { Form } from "./Form"
import { Table } from "./Table"

export const Main = () => {
    const dispatch = useDispatch();

    fetchService('/purchase/getall')
        .then( res => { 
            if(res.ok){
                dispatch(startSetMes(res.data));
                dispatch(startGetMes());
            }
        });
    
    return (
        <div className=''>
            <Form></Form>
            <Table></Table>
        </div>
    )
}


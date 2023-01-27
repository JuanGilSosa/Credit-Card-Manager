import { useSelector } from "react-redux";
import { Form } from "./Form";
import { Table } from "./Table";

export const Manager = () => {
    return (
        <div>
            <Form />
            <Table />
        </div>
    );
}
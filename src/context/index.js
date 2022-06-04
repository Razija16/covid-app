import { createContext } from "react";

const UserContext = createContext({
    first_name:"",
    last_name:"",
    email:"",
    user_id:null,
    caseId:null
});

export default UserContext;
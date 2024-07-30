import { Children } from "react";
import { useSelector} from "react-redux"
import { useNavigation  } from "react-router-dom"

function Protect ({children}) {
    const navigate = useNavigation();
    // const selectUser = (state: any) => state.auth.user;
    const user = useSelector (selectUser);
    
    if (user){
        return Children;
    }else{
        navigate("/Login")
    }

}

export default Protect;
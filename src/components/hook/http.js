
import { useCallback, useReducer } from "react";

const intialState = { isLoad: false, error: null, data: []}
const httpReducer = (currentHttp, action) => {
    switch (action.type) {
        case "SEND":
            return { isLoad: true, error: null, data: []};
        case "RESP":
            return { ...currentHttp, isLoad: false, data: action.data }
        case "ERR":
            return { isLoad: false ,error:action.errormsg}
        default:
            throw new Error("something went wrong!")
    }
}
const useHttp = () => {
    const [httpState, dipatchHttp] = useReducer(httpReducer,intialState);


    const sendRequest =useCallback( (url, method, body) => {
        dipatchHttp({ type: "SEND" })
        fetch(url,
            {
                method: method,
                body: body,
            }
        ).then(respose => {
            return respose.json();
        }).then(data => {
            console.log(data)
            dipatchHttp({ type: "RESP", data: data.articles })
        }).catch(err => {
            dipatchHttp({ type: "ERR", errormsg: "something went wrong!" })

        })
    },[])

    return {
        isLoading: httpState.isLoad,
        error: httpState.error,
        data: httpState.data,
        sendRequest: sendRequest,
    }
}

export default useHttp;
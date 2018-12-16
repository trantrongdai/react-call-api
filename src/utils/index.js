import axios from 'axios';

export const apiCall = (endpoint, method, body) => {
    return (axios({
        method: method,
        url: `http://localhost:3000/${endpoint}`,
        data: body
    })
    )
}
import IO, {io} from 'socket.io-client'
import HOST, { SERVER_PORT } from './configs/config'

export const  socket = io(`http://${HOST}:${SERVER_PORT}`, {
    autoConnect : false,
    query : {
        rani : 'abdo'
    }
})
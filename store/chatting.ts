import {createSlice} from '@reduxjs/toolkit'

const slice  = createSlice({
    name : 'Chatting',
    initialState : {
        chats : [],
        isChatsLoaded : false,
        chatMessages : []
    },
    reducers : {
        SET_CHATS : (state, action) => {
            state.chats = [...action.payload.chats]
            state.isChatsLoaded = true 
        },
        ADD_NEW_CHAT : (state, action) => {
            const isAlreadyExist = state.chats.some(chat => {
                return chat.user._id == action.payload.chat.user._id 
            })
            if (!isAlreadyExist) {
                state.chats.unshift(action.payload.chat)
            }
            
        },
        SET_MESSAGES : (state, action) => {
            state.chatMessages = [...action.payload.chatMessages]
        },
        ADD_MESSAGE : (state, action) => {
            state.chatMessages = [...state.chatMessages, action.payload.message]
        },
        CLEAR_MESSAGES : (state, action) => {
            state.chatMessages = []
        },
        CLEAR_CHATS : (state, action) => {
            state.isChatsLoaded = false 
            state.chats = []
        },
        SET_LAST_MESSAGE : (state, action) => {
            const chatId = action.payload.chatId
            const chatIndex = state.chats.findIndex(chat => {
                return chat.user._id == chatId 
            })
            console.log(action.payload.lastMessage)
            state.chats[chatIndex].lastMessage = action.payload.lastMessage
            state.chats.sort((a, b) => {
                return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
            });
        }
    }
})

export default slice.reducer 
export const actions = slice.actions
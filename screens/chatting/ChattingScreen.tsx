import React, { useState, useEffect } from 'react'
import HOST, { SERVER_PORT } from '../../configs/config'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { socket } from '../../socket'
import Chat from '../Chat/Chat'



const ChattingScreen = props => {

  const [messages, setMessages] = useState([])

  const [message, setMessage] = useState('')

  const [isTyping, setIsTyping] = useState(false)

  const [typingUsername, setTypingUsername] = useState('')



  const username = useSelector(state => {
    return state.auth.name
  })

  const { userId, token } = useSelector(state => {
    return state.auth
  })

  const params = props.route.params



  useEffect(() => {


    axios.post(`http://${HOST}:${SERVER_PORT}/user/messages`, {
      sender: userId,
      receiver: params.receiverId
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        setMessages(response.data.messages)
      })
      .catch(err => {
        console.log(err)
      })





  }, [])

  useEffect(() => {
    const listener = (data) => {
      if (data.action === 'addmessageP')
        if (data.message.sender._id == userId && data.message.receiver._id == params.receiverId
          || data.message.receiver._id == userId && data.message.sender._id == params.receiverId)
          addMessage(data.message)
    }

    const isTypingListener = (data) => {
      if (data.senderId == userId && data.receiverId == params.receiverId
        || data.senderId == params.receiverId && data.receiverId == userId) {
        setTypingUsername(data.username)
        setIsTyping(true)
      }
    }

    const stoppedTypingListener = (data) => {
      if (data.senderId == userId && data.receiverId == params.receiverId
        || data.senderId == params.receiverId && data.receiverId == userId) {
        setIsTyping(false)
      }
    }


    socket.on('messageP', listener)
    socket.on('tttP', isTypingListener)
    socket.on('stoppedTypingP', stoppedTypingListener)

    return () => {
      socket.off('messageP', listener)
      socket.off('tttP', isTypingListener)
      socket.off('stoppedTypingP', stoppedTypingListener)
    }
  }, [])



  const addMessage = (msg) => {
    setMessages((prevState) => [...prevState, msg])
  }


  const sendMessage = () => {
    socket.emit('typingEventP', {
      value: '',
      senderId: userId,
      receiverId: params.receiverId,
      username: username
    })
    let msg = message
    setMessage('')
    setIsTyping(false)
    axios.post(`http://${HOST}:${SERVER_PORT}/user/messages/createmessage`, {
      sender: userId,
      receiver: params.receiverId,
      content: message
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  return (
    <Chat
      messages={messages}
      onTextInputChange={(value) => {
        socket.emit('typingEventP', {
          value: value,
          senderId: userId,
          receiverId: params.receiverId,
          username: username
        })
        setMessage(value)
      }}
      onSend={sendMessage}
      userId={userId}
      typerUsername={typingUsername}
      isTyping={isTyping}
    />
  )
}



export default ChattingScreen
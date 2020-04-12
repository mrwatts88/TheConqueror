import { getState } from './globalState'

const chatUl = document.querySelector('#chat-ul')
const chatBox = document.querySelector('#chat-box')
const slideTab = document.querySelector('#slide-tab')
const chatSendBtn = document.querySelector('#chat-send-btn')
const chatChatBox = document.querySelector('#chat-chat-box')
const chatTextArea = document.querySelector('#chat-text-area')

export const initChat = socket => {
    // Handle chat box slide transition
    slideTab.addEventListener('click', () => {
        if (chatBox.style.right === '0px' || chatBox.style.right === '')
            chatBox.style.right = '-300px'
        else chatBox.style.right = '0px'
    })

    chatTextArea.addEventListener('keypress', event => {
        if (event.which === 13 && !event.shiftKey) {
            sendMessageToServer()
        }
    })

    // Handle chat box messages (Send to server)
    chatSendBtn.addEventListener('click', () => {
        sendMessageToServer()
    })

    // Chat box will always scroll to the bottom when new content is added
    const scrollOb = new MutationObserver(() => {
        chatChatBox.scrollTop = chatChatBox.scrollHeight
    })
    const config = { childList: true }
    scrollOb.observe(chatUl, config)

    // message from chat
    socket.on('globalchatmsg', idNameAndText => {
        // <ul id="chat-ul">
        //     <li>
        //         <b>Matt: </b> How's everyone doing?
        //     </li>
        // </ul>

        const { players } = getState()
        const { id, name, text } = idNameAndText
        const msgNode = document.createElement('LI')
        const nameNode = document.createElement('B')
        const nameTextNode = document.createTextNode(`${name}: `)
        const msgTextNode = document.createTextNode(text)
        nameNode.style.color = players[id].chatColor
        nameNode.appendChild(nameTextNode)
        msgNode.appendChild(nameNode)
        msgNode.appendChild(msgTextNode)
        msgNode.style.whiteSpace = 'pre-line'
        chatUl.appendChild(msgNode)
    })

    const sendMessageToServer = () => {
        const { id, players } = getState()
        const text = chatTextArea.value.trim()
        socket.emit('chatmsg', {
            id,
            name: players[id].name,
            text,
        })

        chatTextArea.value = ''
    }
}

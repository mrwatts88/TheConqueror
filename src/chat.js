import { getState } from './globalState'

const chatUl = document.querySelector('#chat-ul')
const chatBox = document.querySelector('#chat-box')
const slideTab = document.querySelector('#slide-tab')
const nameText = document.querySelector('#name-text')
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

    // Handle chat box messages (Send to server)
    chatSendBtn.addEventListener('click', () => {
        const { id } = getState()
        const text = chatTextArea.value
        chatTextArea.value = ''
        socket.emit('chatmsg', {
            id,
            name: nameText.value,
            text
        })
    })

    // Chat box will always scroll to the bottom when new content is added
    const scrollOb = new MutationObserver(() => { chatChatBox.scrollTop = chatChatBox.scrollHeight })
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
        chatUl.appendChild(msgNode)
    })
}

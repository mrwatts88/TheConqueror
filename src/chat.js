import { getState } from './globalState';

const chatUl = document.querySelector('#chat-ul');
const chatBox = document.querySelector('#chat-box');
const slideTab = document.querySelector('#slide-tab');
const nameText = document.querySelector('#name-text');
const chatSendBtn = document.querySelector('#chat-send-btn');
const chatChatBox = document.querySelector('#chat-chat-box');
const chatTextArea = document.querySelector('#chat-text-area');

export const initChat = socket => {
    // Handle chat box slide transition
    slideTab.addEventListener('click', () => {
        if (chatBox.style.right === '0px' || chatBox.style.right === '')
            chatBox.style.right = '-300px';
        else chatBox.style.right = '0px';
    })

    // Handle chat box messages (Send to server)
    chatSendBtn.addEventListener('click', e => {
        let { players, id } = getState();
        let text = chatTextArea.value;
        chatTextArea.value = "";
        socket.emit('chatmsg', {
            id,
            name: nameText.value,
            text
        });
    })

    // Chat box will always scroll to the bottom when new content is added
    let scrollOb = new MutationObserver(() => { chatChatBox.scrollTop = chatChatBox.scrollHeight; });
    let config = { childList: true };
    scrollOb.observe(chatUl, config);

    // message from chat
    socket.on('globalchatmsg', idNameAndText => {
        // <ul id="chat-ul">
        //     <li>
        //         <b>Matt: </b> How's everyone doing?
        //     </li>
        // </ul>

        let { players } = getState();
        let { id, name, text } = idNameAndText;
        let msgNode = document.createElement("LI");
        let nameNode = document.createElement("B");
        let nameTextNode = document.createTextNode(`${name}: `);
        let msgTextNode = document.createTextNode(text);
        nameNode.style.color = players[id].chatColor;
        nameNode.appendChild(nameTextNode);
        msgNode.appendChild(nameNode);
        msgNode.appendChild(msgTextNode);
        chatUl.appendChild(msgNode);
    });
}

import { getState } from './globalState';

const chatBox = document.querySelector('#chat-box');
const chatSendBtn = document.querySelector('#chat-send-btn');
const slideTab = document.querySelector('#slide-tab');
const chatTextArea = document.querySelector('#chat-text-area');
const nameText = document.querySelector('#name-text');
const chatUl = document.querySelector('#chat-ul');
const chatChatBox = document.querySelector('#chat-chat-box');

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
    let scrollOb = new MutationObserver(() => {
        chatChatBox.scrollTop = chatChatBox.scrollHeight;
    });
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
        let nameNode = document.createElement("B");
        nameNode.style.color = players[id].chatColor;
        let nameTextNode = document.createTextNode(`${name}: `);
        nameNode.appendChild(nameTextNode);
        let msgNode = document.createElement("LI");
        msgNode.appendChild(nameNode);
        let msgTextNode = document.createTextNode(text);
        msgNode.appendChild(msgTextNode);
        chatUl.appendChild(msgNode);
    });
}

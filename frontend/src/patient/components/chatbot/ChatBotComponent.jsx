import ChatBot from 'react-simple-chatbot';
 import React from 'react'
 
 function ChatBotComponent() {

  const steps = [
    {
        id: '0',
        message: 'Hey Geek!',

        // This calls the next id
        // i.e. id 1 in this case
        trigger: '1',
    }, {
        id: '1',

        // This message appears in
        // the bot chat bubble
        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',

        // Here we want the user
        // to enter input
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id: '4',
        options: [

            // When we need to show a number of
            // options to choose we create alist
            // like this
            { value: 1, label: 'View Courses' },
            { value: 2, label: 'Read Articles' },

        ],
        end: true
    }
];


    const config = {
      botAvatar: "/logo.png",
      // floating: true,
  }
   return (
     <div>
        <ChatBot steps={steps} {...config}/>
       
     </div>
   )
 }
 
 export default ChatBotComponent
 
'use client';

import { useState } from 'react';
import { Search, Video, MoreVertical, Send, Paperclip } from 'lucide-react';
import Header from '../organisms/navbar';

export default function MessagingInterface() {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      console.log('Uploaded files:', files);
    }
  };

  const chats = [
    {
      id: 1,
      name: 'Jean-Eude Cokou',
      status: 'Typing...',
      time: '5min ago',
      messages: [
        { type: 'received', text: 'Can you send the file?', time: '5min ago' },
        { type: 'sent', text: 'Sure, here it is.', time: '5min ago' },
      ],
      sharedFiles: [
        { name: 'Design_Wireframe.pdf', type: 'Document', size: '2MB', link: '#' },
        { name: 'Project_Plan.xlsx', type: 'Document', size: '1MB', link: '#' },
        { name: 'Meeting_Photo.jpg', type: 'Photo', size: '500KB', link: '#' },
      ],
    },
    {
      id: 2,
      name: 'Armadine Comlan',
      message: 'You are read !!',
      time: '8:35 PM',
      messages: [
        { type: 'sent', text: 'Hello!', time: '5min ago' },
        { type: 'received', text: 'Hi there!', time: '5min ago' },
      ],
      sharedFiles: [
        { name: 'Task_List.docx', type: 'Document', size: '3MB', link: '#' },
        { name: 'Team_Photo.png', type: 'Photo', size: '800KB', link: '#' },
      ],
    },
    // Add more chat objects here
  ];

  const selectChat = (chatId) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    setActiveChat(selectedChat);
  };

  return (
    <div>
      <div className="flex h-screen bg-white">
        {/* Left Sidebar */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-red-500">Messages</h1>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none"
              />
            </div>

            {/* Chat List */}
            <div className="space-y-4">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => selectChat(chat.id)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                    activeChat?.id === chat.id ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    {chat.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{chat.name}</span>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {chat.status || chat.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              <div className="border-b p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-200"></div>
                  <div>
                    <h2 className="font-medium">{activeChat.name}</h2>
                    <p className="text-sm text-gray-500">Active</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="text-blue-500">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {activeChat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-md ${msg.type === 'sent' ? 'ml-auto' : ''}`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        msg.type === 'sent'
                          ? 'bg-purple-800 text-white'
                          : 'bg-blue-50'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div
                      className={`text-xs text-gray-500 mt-1 ${
                        msg.type === 'sent' ? 'text-right' : ''
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="relative flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    className="w-full pl-4 py-3 rounded-full border focus:outline-none focus:border-purple-500"
                  />
                  <label className="relative">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                    />
                    <Paperclip className="h-5 w-5 text-gray-500 cursor-pointer" />
                  </label>
                  <button className="p-2 bg-purple-800 text-white rounded-full">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging.
            </div>
          )}
        </div>

        {/* Shared Files */}
        {activeChat && (
          <div className="w-80 border-l p-4">
            <h2 className="font-medium text-lg mb-4">Shared Files</h2>
            <div className="space-y-3">
              {activeChat.sharedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => window.open(file.link, '_blank')}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center`}
                  >
                    {file.type === 'Photo' && (
                      <div className="w-6 h-6 bg-blue-300 rounded-md flex items-center justify-center">
                        📷
                      </div>
                    )}
                    {file.type === 'Document' && (
                      <div className="w-6 h-6 bg-gray-300 rounded-md flex items-center justify-center">
                        📄
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{file.name}</h3>
                    <p className="text-sm text-gray-500">{file.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

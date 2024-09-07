'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Minimize2, Maximize2 } from 'lucide-react';

type Message = {
  text: string;
  isBot: boolean;
};

type QuickReply = {
  text: string;
  action: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([{ text: 'Hello! How can I assist you today?', isBot: true }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([
    { text: 'Product Information', action: 'product_info' },
    { text: 'Shipping Status', action: 'shipping_status' },
    { text: 'Return Policy', action: 'return_policy' },
  ]);

  const handleSendMessage = (message: string) => {
    if (message.trim() === '') return;

    setMessages((prevMessages) => [...prevMessages, { text: message, isBot: false }]);

    // Simulate bot response based on user input
    setTimeout(() => {
      let botResponse = 'Thank you for your message. How else can I help you?';
      if (message === 'Product Information') {
        botResponse =
          'Our products are high-quality and competitively priced. What specific product are you interested in?';
        setQuickReplies([
          { text: 'Electronics', action: 'electronics' },
          { text: 'Clothing', action: 'clothing' },
          { text: 'Home Goods', action: 'home_goods' },
        ]);
      } else if (message === 'Shipping Status') {
        botResponse = 'To check your shipping status, please provide your order number.';
        setQuickReplies([]);
      } else if (message === 'Return Policy') {
        botResponse = 'We offer a 30-day return policy for most items. Would you like more details?';
        setQuickReplies([
          { text: 'Yes, more details', action: 'return_details' },
          { text: 'No, thanks', action: 'end_conversation' },
        ]);
      } else {
        setQuickReplies([
          { text: 'Product Information', action: 'product_info' },
          { text: 'Shipping Status', action: 'shipping_status' },
          { text: 'Return Policy', action: 'return_policy' },
        ]);
      }

      setMessages((prevMessages) => [...prevMessages, { text: botResponse, isBot: true }]);
    }, 1000);

    setInputMessage('');
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div>
      <div
        className={`fixed bottom-4 right-4 w-full max-w-md transition-all duration-300 ease-in-out ${
          isMinimized ? 'h-14' : 'h-[500px]'
        }`}
      >
        <div className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full'>
          <div
            className={`bg-blue-600 text-white p-4 flex justify-between items-center ${isMinimized ? 'h-full' : ''}`}
          >
            <h2 className='text-xl font-semibold'>Customer Support</h2>
            <Button variant='ghost' size='icon' onClick={toggleMinimize} className='text-white hover:text-blue-200'>
              {isMinimized ? <Maximize2 className='h-5 w-5' /> : <Minimize2 className='h-5 w-5' />}
              <span className='sr-only'>{isMinimized ? 'Maximize' : 'Minimize'} chat</span>
            </Button>
          </div>
          {!isMinimized && (
            <>
              <ScrollArea className='flex-grow p-4'>
                <div className='space-y-4'>
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isBot ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {quickReplies.length > 0 && (
                <div className='p-4 border-t flex flex-wrap gap-2'>
                  {quickReplies.map((reply, index) => (
                    <Button key={index} variant='outline' size='sm' onClick={() => handleSendMessage(reply.text)}>
                      {reply.text}
                    </Button>
                  ))}
                </div>
              )}
              <div className='p-4 border-t'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputMessage);
                  }}
                  className='flex space-x-2'
                >
                  <Input
                    type='text'
                    placeholder='Type your message...'
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className='flex-grow'
                  />
                  <Button type='submit' size='icon'>
                    <Send className='h-4 w-4' />
                    <span className='sr-only'>Send</span>
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export interface QuickMessage {
  id: number;
  text: string;
  message: string;
}

export interface ContactApp {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type ChatTab = 'ai' | 'contact';

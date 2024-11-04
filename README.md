# YouTube Summarizer and Chat App

https://github.com/user-attachments/assets/c43ed2cd-b3e3-4c58-9bbe-9af9fe4a057f

## Overview

The YouTube Summarizer and Chat App is a web application that allows users to watch YouTube videos, get concise summaries, and interact with the content through a chat interface. Built using Next.js, FastAPI, and LangChain, this app leverages Generative AI techniques to enhance the viewing experience by providing quick access to video content.

## Features

- **Watch Videos**: Users can watch YouTube videos directly within the app.
- **Get Summaries**: Automatically generated summaries of videos, providing users with key points and highlights.
- **Chat with the Video**: Engage in a conversation with the video content, asking questions and receiving real-time answers.
- **Scalable Summarization**: Utilizes a map-reduce strategy for efficient summarization of long videos.
- **Real-time Responses**: Implements server-sent events (SSE) for streaming real-time responses during chat interactions.
- **Conversational Context Retrieval**: Uses a Supabase vector store for context-aware responses, enabling relevant follow-up questions.

## Technologies Used

- **Frontend**: Next.js, TailwindCSS
- **Backend**: FastAPI
- **AI Framework**: LangChain
- **Database**: Supabase (for vector storage)

## Future Additions
- **Multi-Language Support**: Implement support for summarizing and chatting in multiple languages.
- **User Accounts and History**: Allow users to create accounts and save their chat histories and favorite summaries.
- **Bookmarking**: Enable users to bookmark specific videos and their summaries for easy access later.
- **Improved AI Model Integration**: Explore integrating more advanced AI models for better summarization and interaction.
- **Customizable Summarization Settings**: Allow users to customize the length and style of summaries generated.

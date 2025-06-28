Wordsy
==============

A modern, responsive chat application built with Next.js, React, and TypeScript. Features real-time messaging, file uploads, user authentication, and a clean modular architecture.

🚀 Features
-----------

*   **Real-time Chat**: Instant messaging with smooth user experience
    
*   **File Upload**: Support for file attachments with Cloudinary integration
    
*   **User Authentication**: Secure authentication with Clerk
    
*   **Responsive Design**: Mobile-first design with collapsible sidebar
    
*   **Message Management**: Edit and delete messages
    
*   **Memory Integration**: AI-powered chat with Mem0 integration
    
*   **Modern UI**: Clean, dark theme with smooth animations

Live Demo
--------------------------------

[Wordsy](https://wordsy-chat.vercel.app/)

🛠️ Tech Stack
--------------

*   **Frontend**: Next.js 14, React 18, TypeScript
    
*   **Styling**: Tailwind CSS
    
*   **Authentication**: Clerk
    
*   **Database**: MongoDB
    
*   **File Storage**: Cloudinary
    
*   **AI**: Google Generative AI
    
*   **Memory**: Mem0
    
*   **Package Manager**: Bun
    

📋 Prerequisites
----------------

Before you begin, ensure you have the following installed:

*   [Bun](https://bun.sh/) (latest version)
    
*   [Node.js](https://nodejs.org/) (18+ recommended)
    
*   [Git](https://git-scm.com/)
    

🏗️ Installation & Setup
------------------------

### 1\. Clone the Repository

```
git clone https://github.com/Tushar98644/wordsy.git
```

### 2\. Install Dependencies

```
bun install
```

### 3\. Environment Configuration

Create a .env.local file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MEM0_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_GENERATIVE_AI_API_KEY=
MONGODB_URI=
NEXT_PUBLIC_BASE_URL=
```

### 4\. Set Up Required Services

#### Clerk Authentication

1.  Sign up at [Clerk.com](https://clerk.com/)
    
2.  Create a new application
    
3.  Copy the publishable key and secret key to your .env.local
    

#### Cloudinary (File Storage)

1.  Sign up at [Cloudinary.com](https://cloudinary.com/)
    
2.  Get your cloud name, API key, and API secret from the dashboard
    
3.  Add them to your .env.local
    

#### MongoDB Database

1.  **Local MongoDB**: Install MongoDB locally or use MongoDB Compass
    
2.  **MongoDB Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
    
3.  Add the connection string to your .env.local
    

#### Google Generative AI

1.  Go to [Google AI Studio](https://aistudio.google.com/)
    
2.  Create an API key
    
3.  Add it to your .env.local
    

#### Mem0 (Optional)

1.  Sign up at [Mem0.ai](https://mem0.ai/)
    
2.  Get your API key
    
3.  Add it to your .env.local
    

### 5\. Start the Development Server

```
bun dev  
```

The application will be available at [http://localhost:3000](http://localhost:3000)

📁 Project Structure
--------------------

```
src
│   ├── app
│   │   ├── api                              # Versioned API routes 
│   │   │   └── v1
│   │   │       ├── chat
│   │   │       │   └── route.ts
│   │   │       ├── chats
│   │   │       │   ├── create
│   │   │       │   │   └── route.ts
│   │   │       │   ├── list
│   │   │       │   │   └── route.ts
│   │   │       │   ├── messages
│   │   │       │   │   └── route.ts
│   │   │       │   └── route.ts
│   │   │       ├── memory
│   │   │       │   └── route.ts
│   │   │       ├── recall
│   │   │       │   └── route.ts
│   │   │       └── upload
│   │   │           └── route.ts
│   │   ├── chat                             # Chat page 
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── landing                          # Landing page
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── sign-in                          # Sign in page
│   │       └── page.tsx
│   ├── components                           # Components grouped by feature
│   │   ├── chat-window
│   │   │   ├── chat-area.tsx
│   │   │   ├── chat-interface.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── header.tsx
│   │   │   ├── main-content.tsx
│   │   │   ├── mobile-sidebar-toggle.tsx
│   │   │   ├── mobile-sidebar.tsx
│   │   │   └── top-controls.tsx
│   │   ├── icons                             # Custom Icons
│   │   │   ├── GptsIcon.tsx
│   │   │   ├── LibraryIcon.tsx
│   │   │   ├── LogoIcon.tsx
│   │   │   ├── NewChatIcon.tsx
│   │   │   ├── SearchIcon.tsx
│   │   │   ├── SettingsIcon.tsx
│   │   │   └── SoraIcon.tsx
│   │   ├── input                             # Input components
│   │   │   ├── chat-control.tsx
│   │   │   ├── chat-input.tsx
│   │   │   ├── editing-banner.tsx
│   │   │   ├── file-card.tsx
│   │   │   ├── file-preview.tsx
│   │   │   ├── loading-indicator.tsx
│   │   │   ├── submit-button.tsx
│   │   │   └── voice-control.tsx
│   │   ├── login-form.tsx
│   │   ├── messages                           # Message components
│   │   │   ├── document-file.tsx
│   │   │   ├── file-attachment.tsx
│   │   │   ├── image-file.tsx
│   │   │   ├── message-action.tsx
│   │   │   ├── message-container.tsx
│   │   │   ├── message-content.tsx
│   │   │   ├── message-files.tsx
│   │   │   └── message.tsx
│   │   ├── sidebar                            # Sidebar components
│   │   │   ├── bottom-section.tsx
│   │   │   ├── chat-item.tsx
│   │   │   ├── chat-list.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── top-section.tsx
│   │   ├── ui                                # External UI components 
│   │   │   ├── button.tsx
│   │   │   └── input.tsx
│   │   └── welcome-modal.tsx
│   ├── config                                # Configuration files for services
│   │   ├── cloudinary-config.ts
│   │   └── gemini.ts
│   ├── context                               # Contexts for the application
│   │   ├── chat-context.tsx
│   │   └── ui-context.tsx
│   ├── hooks                                 # Custom hooks for the application
│   │   ├── index.ts 
│   │   ├── useAutoScroll.ts
│   │   ├── useChatInput.ts
│   │   ├── useChatManager.ts
│   │   ├── useClickOutside.ts
│   │   ├── useChats.ts
│   │   ├── useFileUpload.ts
│   │   ├── useKeyboardHandlers.ts
│   │   ├── useMessageActions.ts
│   │   ├── useMessageContainer.ts
│   │   └── useMobileSidebar.ts
│   ├── lib                                    # Major business logic
│   │   ├── chat
│   │   │   ├── chat-service.ts
│   │   │   ├── memory-service.ts
│   │   │   └── message-processor.ts
│   │   ├── cloudinary.ts
│   │   ├── db.ts
│   │   ├── memory
│   │   │   ├── client.ts
│   │   │   ├── service.ts
│   │   │   └── validation.ts
│   │   ├── memory.ts
│   │   └── utils.ts
│   ├── middleware.ts                          # Auth middleware (Clerk) 
│   ├── models                                 # MongoDB models
│   │   └── chat.ts
│   ├── types                                  # TypeScript types
│   │   ├── chat.ts
│   │   ├── file.ts
│   │   ├── index.ts
│   │   ├── input.ts
│   │   ├── memory.ts
│   │   └── message.ts
│   └── utils                                  # Utility functions
│       ├── chatApi.ts
│       ├── clipboard.ts
│       ├── file.ts
│       └── memory.ts
```

🎯 Usage
--------

1.  **Sign Up/Login**: Use Clerk authentication to create an account
    
2.  **Start Chatting**: Type messages in the input field
    
3.  **Upload Files**: Click the attachment button to upload files
    
4.  **Mobile Navigation**: Use the hamburger menu on mobile devices
    
5.  **Message Actions**: Edit or delete your messages using the action buttons
    

🔧 Development
--------------

### Available Scripts

```
# Start development server  bun dev  
# Build for production  bun run build  
# Start production server  bun start  
# Run type checking  bun run type-check  
# Run linting  bun run lint   
```

### Code Organization

*   **Contexts**: React Context for state management (no prop drilling)
    
*   **Components**: Modular, reusable UI components
    
*   **Hooks**: Custom hooks for business logic
    
*   **TypeScript**: Full type safety throughout the application
    

🚀 Deployment
-------------

### Vercel (Recommended)

1.  Push your code to GitHub
    
2.  Import your repository on [Vercel](https://vercel.com/)
    
3.  Add your environment variables in the Vercel dashboard
    
4.  Deploy!
    

### Other Platforms

The application can be deployed on any platform that supports Next.js:

*   Netlify
    
*   Railway
    
*   DigitalOcean App Platform
    
*   AWS Amplify
    

🔐 Environment Variables Guide
------------------------------

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk public key | ✅ | pk_test_... |
| CLERK_SECRET_KEY | Clerk secret key | ✅ | sk_test_... |
| MEM0_API_KEY | Mem0 AI memory API key | ⚠️ | mem0_... |
| CLOUDINARY_API_KEY | Cloudinary API key | ✅ | 123456789... |
| CLOUDINARY_API_SECRET | Cloudinary API secret | ✅ | abc123... |
| GOOGLE_GENERATIVE_AI_API_KEY | Google AI API key | ✅ | AIza... |
| MONGODB_URI | MongoDB connection string | ✅ | mongodb://... |
| NEXT_PUBLIC_BASE_URL | Application base URL | ✅ | http://localhost:3000 |

🐛 Troubleshooting
------------------

### Common Issues

1. **Dependencies not installing**
    
    ```
    rm -rf node_modules
    rm bun.lockb
    ```
    ```
    bun install
    ```
    
2.  **Environment variables not loading**
    
    *   Ensure `.env.local` is in the root directory
        
    *   Restart the development server after changes
        
    *   Check for typos in variable names
        
3.  **Database connection issues**
    
    *   Verify MongoDB is running (if using local)
        
    *   Check MongoDB URI format
        
    *   Ensure network access for MongoDB Atlas
        
4.  **Authentication not working**
    
    *   Verify Clerk keys are correct
        
    *   Check domain settings in Clerk dashboard
        
    *   Ensure `NEXT_PUBLIC_BASE_URL` matches your domain
        

📝 Contributing
---------------

1.  Fork the repository
    
2.  Create a feature branch `git checkout -b feature/amazing-feature`
    
3.  Commit your changes `git commit -m 'Add amazing feature'`
    
4.  Push to the branch `git push origin feature/amazing-feature`
    
5.  Open a Pull Request
    

📄 License
----------

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Tushar98644/wordsy/blob/main/LICENSE) file for details.

🤝 Support
----------

If you have any questions or need help with setup, please:

1.  Check the troubleshooting section above
    
2.  Search existing issues on GitHub
    
3.  Create a new issue with detailed information
    

Built with ❤️ using Next.js, vercel AI sdk, Clerk, MongoDB, Cloudinary, Google Gemini, Mem0, TypeScript
# 🎥 WedStream

WedStream is a real-time live broadcasting web application. It leverages the **Agora API** for low-latency, high-quality video and audio streaming, and uses **Ngrok** to securely tunnel and share the local development environment.

## ✨ Features
* **Broadcaster Panel:** Go live and broadcast your video and audio stream.
* **Viewer Panel:** Join the stream as an audience member in real-time.
* **Secure Routing:** Easily share your locally hosted stream with external users via Ngrok.

## 🛠️ Tech Stack
* **Frontend:** React.js
* **Backend:** Node.js / Express (if applicable)
* **Video/Audio RTC:** [Agora.io](https://www.agora.io/en/)
* **Tunneling/Routing:** [Ngrok](https://ngrok.com/)

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed and set up:
1. **Node.js & npm:** [Download Node.js](https://nodejs.org/)
2. **Agora Developer Account:** Sign up at [Agora.io](https://www.agora.io/en/) to get your `App ID` and `App Certificate`.
3. **Ngrok Account:** Sign up at[Ngrok.com](https://ngrok.com/) and install the Ngrok CLI on your machine.

---

## 🚀 Getting Started

### 1. Clone the repository
\`\`\`bash
git clone <your-repository-url>
cd WedStream
\`\`\`

### 2. Environment Variables
Create a `.env` file in the root directory (and in your client/server folders if separated) and add your Agora credentials:
\`\`\`env
REACT_APP_AGORA_APP_ID=your_agora_app_id_here
# Add any other necessary environment variables here
\`\`\`
*(Note: Never commit your `.env` file to GitHub!)*

### 3. Install Dependencies
Install all required packages for the project:
\`\`\`bash
npm install
\`\`\`
*(If your `client` and `server` are in separate folders, make sure to run `npm install` inside both directories).*

### 4. Run the Application
Start the development server:
\`\`\`bash
npm start
\`\`\`

---

## 🌐 Secure Routing with Ngrok

To share your local application with others over the internet (or to test mobile broadcasting securely), you can use Ngrok.

1. Open a new terminal window.
2. Run the following command to expose your local port (assuming your React app runs on port 3000):
\`\`\`bash
ngrok http 3000
\`\`\`
3. Ngrok will generate a secure `https` Forwarding URL. Copy that link and share it with your viewers!

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

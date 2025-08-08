#  Online Code Editor

A DYK(Did you Know) Code is online code editor that lets you write, run, and test code in multiple programming languages directly from your browser.  
Built with **React (Vite)** for the frontend and **Node.js + Express** for the backend, using the **Judge0 API** for code execution.

---

##  Features
-  **Run Code Instantly** in multiple languages (JavaScript, Python, C++, C, Java, MySQL, etc.)
-  **Cross-Origin Support** with secure CORS configuration
-  **Rate Limiting** to prevent abuse
-  **Deployed on Render & Vercel** for seamless access
-  Clean and responsive UI

---

##  Screenshots
| Home Page | Code Execution |
|-----------|----------------|
| ![Home]<img width="918" height="759" alt="image" src="https://github.com/user-attachments/assets/11125ffb-d5d7-43d0-b1ff-91330d07b1ff" />| ![Run]<img width="1038" height="854" alt="image" src="https://github.com/user-attachments/assets/2bc319b3-0f14-4a54-a501-d9a836d834ca" /> |

> <img width="1913" height="869" alt="image" src="https://github.com/user-attachments/assets/7e358c5d-9e06-4640-bcb4-c1fbfd2e19ef" />
-----
## 🛠 Installation & Local Setup

### 1️⃣ Clone the Repository
    ```bash
    git clone https://github.com/deepakk-singh/online-code-editor.git
    cd online-code-editor

### 2️⃣ Backend Setup
    ```bash
    cd server
    npm install
    npm start


### 3️⃣ Frontend Setup
    ```bash
    cd ../client
    npm install
    npm run dev


#  Deployment
    Backend on Render
    Push backend code to GitHub.
    Create a new Web Service in Render.
    Add environment variables in Render → Environment Variables.

### Deploy.
    Frontend on Vercel
    Push frontend code to GitHub.

### Tech Stack
- Frontend: React, Vite, Axios
- Backend: Node.js, Express, CORS, dotenv, express-rate-limit
- API: Judge0 (via RapidAPI)
- Deployment: Vercel (Frontend), Render (Backend)

## 🌐 Live Demo

- 🔗 **Frontend:** [Click Here](https://your-frontend.vercel.app)
- 🔗 **Backend API:** [Click Here](https://your-backend.onrender.com)



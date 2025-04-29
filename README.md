# inforce-task

Technical Stack
React

Redux (with Redux Toolkit)

TypeScript

📋 Task Description
Build a Product List Web App to simulate a shopping application.
There are two main views:

Product List View – displays all products.

Product View – shows detailed information about a selected product.

🚀 Getting Started
This project was bootstrapped with Create React App, using the Redux Toolkit template.

🔧 Project Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/bondalexx/inforce-task.git
Open the folder in your code editor.

In the terminal, navigate to the client and install dependencies:

bash
Copy
Edit
cd ./inforce-task-client
npm install
Open a new terminal, go to the db folder, and install json-server globally:

bash
Copy
Edit
cd ./db
npm install -g json-server
🏁 Running the App
1. Start the React app:
bash
Copy
Edit
npm run dev
(inside inforce-task-client folder)

2. Start the mock backend:
bash
Copy
Edit
json-server --watch db.json --port 3001
(inside db folder)

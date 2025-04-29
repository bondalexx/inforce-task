# inforce-task

## 🛠 Technical Stack

- **React**
- **Redux (with Redux Toolkit)**
- **TypeScript**

---

## Task Description

Build a **Product List Web App** to simulate a shopping application.  
There are two main views:

- **Product List View** – displays all products.
- **Product View** – shows detailed information about a selected product.

---

## Getting Started

This project was bootstrapped with **Create React App**, using the **Redux Toolkit** template.

### Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bondalexx/inforce-task.git
   ```
  
2.Open the folder in your code editor.

3.In the terminal, navigate to the client and install dependencies:
  ```bash
    cd ./inforce-task-client
    npm install
  ```
4.Open a new terminal, go to the db folder, and install json-server globally:
   ```bash
   cd ./db
   npm install -g json-server
   ```
### Running the App
1. Start the React app:
   ```bash
   cd ./inforce-task-client
   npm run dev
   ```
2.Start the mock backend:
   ```bash
   cd ./db
   json-server --watch db.json --port 3001
   ```



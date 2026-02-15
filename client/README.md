 Lead Capture Application:

React + Express + Webhook Integration

       A full-stack Lead Capture application built using React for the frontend and Node.js with Express for the backend.

       This project demonstrates how to capture lead information from users, send it securely to the backend using environment variables, process it through a webhook endpoint, and store it in LocalStorage as a mock database.

Project Overview

        The application allows users to:

        Submit lead details (Name, Email, Mobile, Company, Source)

        Send data from frontend to backend using Axios

        Use environment variables for secure configuration

        Process data through an Express webhook endpoint

        Store and manage leads using LocalStorage (mock storage)

        Navigate between pages using React Router

        This project is designed as a practical full-stack learning implementation.

Technology Stack

  Frontend

        React

        React Router

        Axios

        LocalStorage

        Environment Variables (.env)

  Backend

        Node.js

        Express

        Express Router

        CORS

        dotenv (.env support)

Application Workflow

        User fills the lead form on the frontend.

        React sends the data to the backend using Axios.

        The API base URL is stored securely in a frontend .env file.

        The Express server receives the request through a router.

        The webhook endpoint processes or forwards the lead data.

        Lead information is stored in LocalStorage for demonstration purposes.

        The Dashboard displays Total leads, Webhook Success, Webhook failed.
 

Webhook Integration

        The project includes a webhook endpoint that:

        Accepts incoming POST requests

        Processes lead data 
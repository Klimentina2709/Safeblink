# Safeblink - Safe Web Browsing Education

## Overview

Safeblink is a Single Page Application (SPA) created during my Brainster Journey, designed to educate users about safe web browsing practices. This project marks my first experience with Tailwind CSS and SPA development, as well as working with a backend.

## Project Mentor

Marjan Ralevski

## Technologies Used

HTML
CSS (including Tailwind CSS)
Vanilla JavaScript
Python (Flask) for the REST API

## Features

User login functionality with multiple users:

- User123 / Pass123
- User456 / Pass456
- User789 / Pass789

REST API implemented in Python using Flask.
Tailwind CSS is configured for styling; no additional setup is needed unless file locations change. If style changes are made, run npm run dev in the terminal to apply the updates.

- Prerequisites

Node.js (includes npm)
Python (version 3.12.3)
Flask and Flask-CORS libraries

## Screenshot

![Safeblink Screenshot](/screenshot.png)

## Getting Started

1. Setting Up the Project
   a. Clone the Repository
   Download the project files or clone the repository.

b. Install Node.js
Make sure Node.js is installed. You can download it from Node.js official website.

c. Install http-server
In the terminal, run the following command:

npm install -g http-server 2. Running the Project
a. Start the HTTP Server
Navigate to the project directory and start the server:

http-server -p 5500
b. Open in Browser
Access the project in your web browser by visiting:

http://localhost:5500/
Alternatively, you can open the project using Live Server in Visual Studio Code.

3. Setting Up the REST API
   a. Install Python
   Download and install Python version 3.12.3 from Python's official website. Ensure you check the "Add Python to PATH" option during installation.

b. Install Flask and Flask-CORS
In the terminal, install the required Python libraries:

bash
Copy code
pip install flask
pip install flask_cors
c. Run the REST API
Navigate to the REST API directory and start the server by running:

bash
Copy code
python '.\REST API\authenticator.py'
If successful, the application will be ready to authenticate the listed users.

4. Troubleshooting Tailwind CSS
   If Tailwind CSS styles do not appear as expected, you can temporarily add a CDN link in the <head> tag:

## Style

<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
To update Tailwind classes after changes, execute:

npm run dev

## Contact

If you have any questions, feel free to contact me.

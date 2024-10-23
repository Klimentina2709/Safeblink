# Safeblink - Safe Web Browsing Education

## Overview

Safeblink is a Single Page Application (SPA) created during my Brainster Journey, designed to educate users about safe web browsing practices. This project marks my first experience with Tailwind CSS and SPA development, as well as working with a backend.

## Project Mentor

Marjan Ralevski

## Technologies Used

- ![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white) : HTML
- ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white) : CSS (including Tailwind CSS)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) : Vanilla JavaScript
- ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) : Python (Flask) for the REST API
- ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)

## Features

User login functionality with multiple users:

- User123 / Pass123
- User456 / Pass456
- User789 / Pass789

REST API implemented in Python using Flask.
Tailwind CSS is configured for styling - no additional setup is needed unless file locations change.

- Prerequisites

Node.js (includes npm)
Python (version 3.12.3)
Flask and Flask-CORS libraries

## Screenshot

![Safeblink Screenshot](/screenshot.png)

## Getting Started

### Setting Up the REST API

- **Install Python**
  Download and install Python version 3.12.3 from [Python's official website](https://www.python.org/).
- **Install Flask and Flask-CORS**
  In the terminal, install the required Python libraries (if already don't have them installed):

```bash
pip install flask
pip install flask_cors

```

- **Run the REST API**  
  Navigate to the REST API directory and start the server by running:

  ```bash
  python '.\REST API\authenticator.py'

  ```

### Setting Up the Project

- **Download the project files** or clone the repository.

- **Install Node.js**  
  Make sure Node.js is installed. You can download it from [Node.js official website](https://nodejs.org/).

- **Install `http-server`**  
  In the terminal, run the following command (if already don't have it installed):

```bash
npm install -g http-server

```

- **Set the HTTP Server**  
  Navigate to the project directory and start the server by running:

  ```bash
  http-server -p 5500
  ```

### Running the Project

- **Open in Browser**
  Access the project in your web browser by visiting:

[http://localhost:5500/](http://localhost:5500/)

If successful, the application will be ready to authenticate the listed users.

## Contact

If you have any questions, feel free to contact me.

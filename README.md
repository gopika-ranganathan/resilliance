# Resilience – Disaster Support and Resource Finder

Resilience is a full-stack disaster response platform designed to help communities during natural disasters by providing a centralized system for shelters, food, volunteers, and animal rescue.

## Tech Stack
*   **Frontend**: React.js (Vite), React Router, TailwindCSS v4, Axios
*   **Backend**: Java Spring Boot, Spring Security, JWT, Spring Data JPA
*   **Database**: MySQL

## Prerequisites
*   Node.js (v18+)
*   Java (17+)
*   Maven
*   MySQL Server (Running locally on port 3306)

## Setup Instructions

### 1. Database Setup
1. Open MySQL and create the database:
   ```sql
   CREATE DATABASE resilience;
   ```
2. Update the credentials in `backend/src/main/resources/application.properties` if your MySQL username/password is not `root`/`password`.

### 2. Running the Backend
1. Open a terminal and navigate to the `backend` directory.
2. Run the application using the Maven wrapper:
   ```bash
   # Windows
   ./mvnw.cmd spring-boot:run
   
   # Mac/Linux
   ./mvnw spring-boot:run
   ```
   *The server will start on `http://localhost:8080`, and JPA will automatically generate your database tables.*

### 3. Running the Frontend
1. Open a new terminal and navigate to the `frontend` directory.
2. (Optional) Update the Google Maps API Key in `src/components/MapPicker.jsx`.
3. Start the development server:
   ```bash
   npm run dev
   # If that command instantly exits on your system, try this instead:
   npx vite
   ```
   *The React app will open at `http://localhost:5173`.*

## Features Implemented
*   **JWT Authentication**: Secure login and registration.
*   **Disaster Updates**: Real-time disaster reporting with map markers.
*   **Shelter Finder**: Registration and tracking of shelter capacities.
*   **Food Centers**: Location of food distributions.
*   **Volunteer Support**: Organizations requesting help.
*   **Animal Rescue**: Reporting abandoned animals in need of rescue.
*   **Emergency Contacts**: Instant life-saving phone numbers and guidelines.

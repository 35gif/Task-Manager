Task Manager App
This is a Task Manager mobile application built using React Native and Expo. The app allows users to manage tasks, including creating, editing, and deleting tasks. The app also supports task sorting by date and status, as well as a light/dark theme toggle.

Features:
Add new tasks: Tasks can include a title, description, due date/time, and location.
Task sorting: Tasks can be sorted by date or by status (in progress, completed, or canceled).
Status management: Users can update task status (in progress, completed, or canceled).
Dark/Light mode: Supports both dark and light themes for better usability.
Modern UI: Designed to resemble the iPhone Notes app for a sleek, minimalistic interface.
Screenshots
(Add screenshots of the app here)

Installation:
Clone the repository:
git clone https://github.com/yourusername/task-manager-app.git
Install dependencies:
npm install
Start the app:
expo start
Technologies Used:
React Native: Core framework for building mobile apps.
Expo: For simplified development workflow.
React Navigation: Navigation between screens.
@react-native-community/datetimepicker: For selecting dates and times.
Hermes: JavaScript engine for performance optimization on Android.
Git: Version control.
Code Explanation:
The code follows a modular architecture with components for each functional part of the app.
State management is done using React's built-in useState hook for each form and feature.
Tasks are stored locally in state, and all state management is handled within the app, as no external API is used.
DatePicker is used to select due dates for tasks, integrated into the task form.
Key components:
TaskList: Displays the list of tasks with sorting options.
AddTaskForm: The form to add a new task.
TaskDetails: A screen that shows task details and allows status changes.
How to run the demo:
Install dependencies and set up the development environment.
Record a demo video that walks through task creation, sorting, status updates, and theme switching.
Export the APK and upload the video file.
Contribution:
Feel free to fork the repository and contribute by submitting a pull request.

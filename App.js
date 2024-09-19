import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { saveTasks, loadTasks } from './components/AsyncStorageHelper';
import { useColorScheme } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    loadTasks().then((loadedTasks) => {
      if (loadedTasks) {
        setTasks(loadedTasks);
      }
    });
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const updateTaskStatus = (index, status) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
    saveTasks(filteredTasks);
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkTheme : styles.lightTheme]}>
      <Button title={`Сменить на ${theme === 'light' ? 'темную' : 'светлую'} тему`} onPress={toggleTheme} />
      <AddTaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onStatusChange={updateTaskStatus} onDelete={deleteTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  darkTheme: {
    backgroundColor: '#333',
  },
  lightTheme: {
    backgroundColor: '#fff',
  },
});

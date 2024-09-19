import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddTaskForm({ onAddTask, theme }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (title.trim()) {
      const newTask = {
        title,
        description,
        date: date.toLocaleString(),
        location,
        status: 'Выполняется',
      };
      onAddTask(newTask);
      setTitle('');
      setDescription('');
      setDate(new Date());
      setLocation('');
    }
  };

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const changeMonth = (months) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    setDate(newDate);
  };

  const changeYear = (years) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    setDate(newDate);
  };

  return (
    <ScrollView style={[styles.container, theme === 'dark' ? styles.darkTheme : styles.lightTheme]}>
      <TextInput
        style={[styles.input, styles.titleInput, theme === 'dark' ? styles.darkInput : styles.lightInput]}
        placeholder="Название задачи"
        placeholderTextColor={theme === 'dark' ? '#98989D' : '#8E8E93'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput, theme === 'dark' ? styles.darkInput : styles.lightInput]}
        placeholder="Описание задачи"
        placeholderTextColor={theme === 'dark' ? '#98989D' : '#8E8E93'}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity 
        style={[styles.input, styles.dateInput, theme === 'dark' ? styles.darkInput : styles.lightInput]}
        onPress={() => setShowDatePicker(!showDatePicker)}
      >
        <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
          {date.toLocaleString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <View style={styles.datePickerContainer}>
          <View style={styles.dateButtonRow}>
            <TouchableOpacity style={[styles.dateButton, theme === 'dark' ? styles.darkDateButton : styles.lightDateButton]} onPress={() => changeDate(-1)}>
              <Text style={theme === 'dark' ? styles.darkDateButtonText : styles.lightDateButtonText}>-1 день</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dateButton, theme === 'dark' ? styles.darkDateButton : styles.lightDateButton]} onPress={() => changeDate(1)}>
              <Text style={theme === 'dark' ? styles.darkDateButtonText : styles.lightDateButtonText}>+1 день</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateButtonRow}>
            <TouchableOpacity style={[styles.dateButton, theme === 'dark' ? styles.darkDateButton : styles.lightDateButton]} onPress={() => changeMonth(-1)}>
              <Text style={theme === 'dark' ? styles.darkDateButtonText : styles.lightDateButtonText}>-1 месяц</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dateButton, theme === 'dark' ? styles.darkDateButton : styles.lightDateButton]} onPress={() => changeMonth(1)}>
              <Text style={theme === 'dark' ? styles.darkDateButtonText : styles.lightDateButtonText}>+1 месяц</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateButtonRow}>
            <TouchableOpacity style={[styles.dateButton, theme === 'dark' ? styles.darkDateButton : styles.lightDateButton]} onPress={() => changeYear(-1)}>
              <Text style={theme === 'dark' ? styles.darkDateButtonText : styles.lightDateButtonText}>-1 год</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dateButton, theme === 'dark' ? styles.darkDateButton : styles.lightDateButton]} onPress={() => changeYear(1)}>
              <Text style={theme === 'dark' ? styles.darkDateButtonText : styles.lightDateButtonText}>+1 год</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TextInput
        style={[styles.input, theme === 'dark' ? styles.darkInput : styles.lightInput]}
        placeholder="Местоположение"
        placeholderTextColor={theme === 'dark' ? '#98989D' : '#8E8E93'}
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={[styles.addButton, theme === 'dark' ? styles.darkAddButton : styles.lightAddButton]} onPress={handleSubmit}>
        <Ionicons name="add-circle" size={24} color={theme === 'dark' ? '#FFFFFF' : '#007AFF'} />
        <Text style={[styles.addButtonText, theme === 'dark' ? styles.darkAddButtonText : styles.lightAddButtonText]}>Добавить задачу</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  titleInput: {
    fontWeight: 'bold',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    justifyContent: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  darkTheme: {
    backgroundColor: '#1C1C1E',
  },
  lightTheme: {
    backgroundColor: '#F2F2F7',
  },
  darkInput: {
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
  },
  lightInput: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  dateButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  darkDateButton: {
    backgroundColor: '#3A3A3C',
  },
  lightDateButton: {
    backgroundColor: '#E5E5EA',
  },
  darkDateButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  lightDateButtonText: {
    color: '#007AFF',
    textAlign: 'center',
  },
  darkAddButton: {
    backgroundColor: '#0A84FF',
  },
  lightAddButton: {
    backgroundColor: '#E5E5EA',
  },
  darkAddButtonText: {
    color: '#FFFFFF',
  },
  lightAddButtonText: {
    color: '#007AFF',
  },
});
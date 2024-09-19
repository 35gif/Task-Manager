import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskList = ({ tasks, onStatusChange, onDelete, theme }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return task.status !== 'Завершена';
    if (filter === 'completed') return task.status === 'Завершена';
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
  });

  const renderTask = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.taskItem,
        theme === 'dark' ? styles.darkTaskItem : styles.lightTaskItem,
        item.status === 'Завершена' && styles.completedTaskItem,
        item.status === 'Отменена' && styles.canceledTaskItem,
      ]}
      onLongPress={() => onDelete(index)}
    >
      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskTitle,
            theme === 'dark' ? styles.darkText : styles.lightText,
            item.status === 'Завершена' && styles.completedTaskText,
          ]}
        >
          {item.title}
        </Text>
        {item.description ? (
          <Text
            style={[
              styles.taskDescription,
              theme === 'dark' ? styles.darkText : styles.lightText,
              item.status === 'Завершена' && styles.completedTaskText,
            ]}
          >
            {item.description}
          </Text>
        ) : null}
        <Text style={[styles.taskDate, theme === 'dark' ? styles.darkSubText : styles.lightSubText]}>
          {new Date(item.date).toLocaleString()}
        </Text>
        {item.location ? (
          <Text style={[styles.taskLocation, theme === 'dark' ? styles.darkSubText : styles.lightSubText]}>
            <Ionicons name="location-outline" size={14} color={theme === 'dark' ? '#8e8e93' : '#8e8e93'} />
            {item.location}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={[styles.statusButton, getStatusStyle(item.status)]}
        onPress={() => onStatusChange(index, getNextStatus(item.status))}
      >
        <Text style={styles.statusButtonText}>{item.status}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(index)}>
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Выполняется': return styles.activeStatusButton;
      case 'Завершена': return styles.completedStatusButton;
      case 'Отменена': return styles.canceledStatusButton;
      default: return styles.activeStatusButton;
    }
  };

  const getNextStatus = (currentStatus) => {
    const statuses = ['Выполняется', 'Завершена', 'Отменена'];
    const currentIndex = statuses.indexOf(currentStatus);
    return statuses[(currentIndex + 1) % statuses.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('all')} style={[styles.filterButton, filter === 'all' && styles.activeFilter]}>
          <Text style={styles.filterButtonText}>Все</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('active')} style={[styles.filterButton, filter === 'active' && styles.activeFilter]}>
          <Text style={styles.filterButtonText}>Активные</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')} style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}>
          <Text style={styles.filterButtonText}>Завершенные</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={() => setSortBy('date')} style={[styles.sortButton, sortBy === 'date' && styles.activeSort]}>
          <Text style={styles.sortButtonText}>По дате</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy('status')} style={[styles.sortButton, sortBy === 'status' && styles.activeSort]}>
          <Text style={styles.sortButtonText}>По статусу</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 15,
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 12,
    marginBottom: 2,
  },
  taskLocation: {
    fontSize: 12,
  },
  darkTaskItem: {
    backgroundColor: '#1c1c1e',
    borderBottomColor: '#38383A',
  },
  lightTaskItem: {
    backgroundColor: '#fff',
    borderBottomColor: '#c6c6c8',
  },
  completedTaskItem: {
    opacity: 0.7,
  },
  canceledTaskItem: {
    opacity: 0.5,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  darkSubText: {
    color: '#8e8e93',
  },
  lightSubText: {
    color: '#8e8e93',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
  },
  statusButton: {
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  activeStatusButton: {
    backgroundColor: '#34C759',
  },
  completedStatusButton: {
    backgroundColor: '#007AFF',
  },
  canceledStatusButton: {
    backgroundColor: '#FF3B30',
  },
  statusButtonText: {
    fontSize: 12,
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c6c6c8',
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  filterButtonText: {
    color: '#007AFF',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c6c6c8',
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeSort: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  sortButtonText: {
    color: '#007AFF',
  },
  
  deleteButton: {
    padding: 5,
  },
});

export default TaskList;
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import * as firebase from '@react-native-firebase/app';

const AddTask = () => {
  const [task, setTask] = useState('');
  const [database, setDatabase] = useState(null); // State to hold database reference

  // Fetch database reference on component mount
  useEffect(() => {
    const db = firebase.database();
    setDatabase(db);
  }, []);

  const handleAddTask = () => {
    if (database) {
      const tasksRef = database.ref('tasks'); // Reference to the tasks node
      const newTaskRef = tasksRef.push(); // Generate a unique key for the new task
      newTaskRef.set({
        task,
        createdAt: firebase.database.ServerValue.TIMESTAMP, // Use ServerValue for timestamp
      })
        .then(() => {
          setTask('');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('Database reference not found');
    }
  };

  return (
    <View>
      <TextInput placeholder="Add Task" value={task} onChangeText={setTask} />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

export default AddTask;

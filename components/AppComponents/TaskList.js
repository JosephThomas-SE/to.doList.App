// TaskList.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/app'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('tasks')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const tasks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasks);
      });

    return () => unsubscribe();
  }, []);

  const handleDeleteTask = (id) => {
    firestore.collection('tasks').doc(id).delete().catch(error => {
      console.error(error);
    });
  };

  return (
    <View>
      {tasks.map(task => (
        <View key={task.id}>
          <Text>{task.task}</Text>
          <Button title="Delete" onPress={() => handleDeleteTask(task.id)} />
        </View>
      ))}
    </View>
  );
};

export default TaskList;

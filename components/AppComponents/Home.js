// Home.js
import React from 'react';
import { View, Button } from 'react-native';
import auth from '@react-native-firebase/app'; 

const Home = ({ navigation }) => {
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    });
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;

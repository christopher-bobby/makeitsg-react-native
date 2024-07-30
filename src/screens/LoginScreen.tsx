import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import { RootStackParamList } from '../types';

const LoginScreen = ({ navigation } : {navigation: NativeStackNavigationProp<RootStackParamList, 'ProductList'>}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');


  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3300/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed!');
      }

      const data = await response.json();
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('role', data.role);


      navigation.navigate('ProductList');

    } catch (error: any) {
      setErrorUsername('Username / password do not match');
      setErrorPassword('Username / password do not match')
      Alert.alert('Login Failed', error.message);
    } 
  };


  const handleUsername = (text: string) => {
    setErrorUsername('');
    setErrorPassword('');
    setUsername(text);
  }

  const handlePassword = (text: string) => {
    setErrorUsername('');
    setErrorPassword('');
    setPassword(text);
  }

  useEffect(()=> {
    const checkToken = async() => {
      let token =  await AsyncStorage.getItem('token');
      if(token) {
        navigation.navigate('ProductList');
      }
    }

    checkToken();
  },[])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={styles.image}
      />
      <Text style={styles.title}>Let's sign you in</Text>

      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={handleUsername}
        />
        {errorUsername && (<Text style={styles.errorText}>{errorUsername}</Text>)}
      </View>

      <View style={styles.passwordInput}>
        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={handlePassword}
          secureTextEntry
        />
        {errorPassword && (<Text style={styles.errorText}>{errorPassword}</Text>)}
      </View>
     
      <CustomButton title="Login" onPress={handleLogin} style={styles.loginButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 24,
    borderRadius: 50
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  label: {
    marginBottom: 4
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  errorText: {
    color: '#ff4c4c',
    marginTop: 4,
  },
  passwordInput: {
    marginTop: 16,
    marginBottom: 24
  },
  loginButton: {
    height: 50,
    fontSize: 20,
    fontWeight: '600',
    padding: 10,
    borderRadius: 6,
    backgroundColor: 'black',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen;

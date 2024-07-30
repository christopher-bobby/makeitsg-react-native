import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Loader from '../components/Loading';

const AddProduct = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState({
    name: '',
    price: '',
    quantity: '',
  })
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const submitAddProduct = async() => {
        let token =  await AsyncStorage.getItem('token');
        if (!name.length || !price.length || !quantity.length) {
          const newError = { ...error };
        
          if (!name.length) {
            newError.name = 'Name is required';
          }
        
          if (!price.length) {
            newError.price = 'Price is required';
          }
        
          if (!quantity.length) {
            newError.quantity = 'Quantity is required';
          }
        
          setError(newError);
          return;
        }
        setLoading(true);
        setError({
          name: '',
          price: '',
          quantity: ''
        })
        try {
          const response = await fetch('http://localhost:3300/products', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              name,
              price: Number(price),
              quantity: Number(quantity),
              image: imageUrl,
              description
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          if(result.product.result) {
            navigation.navigate('ProductList');
          }
        } catch (error: any) {
          // Handle error
          Alert.alert('Error', error.message);
        } finally {
          setLoading(false);
        }
    }

  if(loading) {
    return <Loader />
  }


  return (
    <View style={styles.container}>
 
      <Text style={styles.title}>Let's add a new product</Text>

      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {error.name && (<Text style={styles.errorText}>{error.name}</Text>)}

      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
        />
        {error.price && (<Text style={styles.errorText}>{error.price}</Text>)}
      </View>
     
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
        />
        {error.quantity && (<Text style={styles.errorText}>{error.quantity}</Text>)}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textarea}
          value={description}
          multiline
          numberOfLines={4}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Image Url</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
        />
      </View>

      <CustomButton title="Add" onPress={submitAddProduct} style={styles.addButton} />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white'
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
  inputContainer: {
    marginTop: 12
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  textarea: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
  errorText: {
    color: '#ff4c4c',
    marginTop: 4,
  },
 
  addButton: {
    height: 50,
    fontSize: 20,
    fontWeight: '600',
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'black',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }
});

export default AddProduct;

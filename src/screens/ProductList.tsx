import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Product, RootStackParamList } from '../types';
import ListItem from '../components/ListItem';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../components/Loading';


const ProductList = () => {
  const isFocused = useIsFocused();

  const [userRole, setUserRole] = useState<string>('view');
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [height, setHeight] = useState(Dimensions.get('window').height - 100);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchData = async () => {
      let token =  await AsyncStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:3300/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json(); 
        setItems(result.product.result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, [navigation, isFocused]);

  useEffect(()=>{
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem('role') || 'view';
      setUserRole(role)
    }
    fetchUserRole();
  }, [])

  const handleRedirection = () => {
    navigation.navigate('AddProduct')
  }

  if(loading) {
    return <Loader />
  }
  return (
    <View style={[styles.container, { height }]}>
      {userRole === 'edit' && (<CustomButton title="Add Product" onPress={handleRedirection} style={styles.addButton}  />)}
      <FlatList
        scrollEnabled
        data={items}
        renderItem={({ item }) => <ListItem {...item} />}
        style={styles.flatList}
      />
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  flatList: {
    marginTop: 20
  },
  addButton: {
    height: 50,
    fontSize: 20,
    fontWeight: '600',
    padding: 10,
    borderRadius: 6,
    backgroundColor: 'black',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
});


export default ProductList;

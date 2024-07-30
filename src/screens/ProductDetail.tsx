import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductDetailType, Product } from '../types';

type RootStackParamList = {
  ProductDetail: Product;
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;
  const [productDetail, setProductDetail] = useState({
    image:'',
    name: '',
    price: 0,
    quantity: 0,
    description: ''
  } as ProductDetailType)

  useEffect(() => {
    const fetchData = async () => {
      let token =  await AsyncStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:3300/products/${id}`, {
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
        setProductDetail(result.product.result)
      } catch (error) {
      //  setError(error.message);
      } finally {
       // setLoading(false);
      }
    };


    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: `${productDetail.image ? productDetail.image : 'https://picsum.photos/200'}` }} style={styles.image} />
      <Text style={styles.name}>{productDetail.name}</Text>
      <Text style={styles.price}>${productDetail.price.toFixed(2)}</Text>
      <Text style={styles.quantity}>Quantity: {productDetail.quantity}</Text>
      <Text style={styles.description}>Description: {productDetail.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.8)',
    marginBottom: 10,
  },
  quantity: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.8)',
  },
  description: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.8)',
    marginTop: 14
  }
});

export default ProductDetail;

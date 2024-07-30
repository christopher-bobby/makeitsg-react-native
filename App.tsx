import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import LoginScreen from './src/screens/LoginScreen';
import AddProduct from './src/screens/AddProduct';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

const App = () => {
  return (
      <View style={styles.appContainer}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'MakeIt' }} />
            <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Products' }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Product Detail' }} />
            <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Add Product' }} />
          </Stack.Navigator>
      </NavigationContainer>
      </View>
  );
};

export default App;

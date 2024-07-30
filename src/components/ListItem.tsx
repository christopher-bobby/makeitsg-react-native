    import { useNavigation } from '@react-navigation/native';
    import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
    import { Product, RootStackParamList } from '../types';
    import React from 'react';
    import { StackNavigationProp } from '@react-navigation/stack';

    const ListItem = ({ id, name, price, quantity, image }: Product) => {
        const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

        return (
            <TouchableOpacity onPress={() =>  navigation.navigate('ProductDetail', { id }) } >
                <View style={styles.item}>
                <ImageBackground source={{ uri: `${image ? image : 'https://picsum.photos/200'}` }} style={styles.image} />
                
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                    <Text style={styles.quantity}>Quantity: {quantity}</Text>
                    
                </View>
                </View>
            </TouchableOpacity>
        );
    };

    export default ListItem  
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        item: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            marginVertical: 8,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 4,
            overflow: 'hidden'
        },
        image: {
            width: '100%',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        textContainer: {
            padding: 20,
            flex: 1,
            justifyContent: 'center',
        },
        name: {
            fontSize: 24,
            fontWeight: 'semibold',
            color: 'rgba(0, 0, 0, 0.8)',
            textTransform: 'capitalize'
        },
        price: {
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.8)',
            marginTop: 14,
            marginBottom: 14
        },
        quantity: {
            fontSize: 18,
            color: 'rgba(0, 0, 0, 0.8)',
        },
    });
    
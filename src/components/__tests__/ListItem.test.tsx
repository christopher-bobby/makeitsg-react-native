import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListItem from '../ListItem';
import { NavigationContainer } from '@react-navigation/native';
import { Product } from '../../types';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
  };
});


const mockNavigate = jest.fn();
(useNavigation as jest.Mock).mockReturnValue({
  navigate: mockNavigate,
});

describe('ListItem Component', () => {
  const product: Product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    quantity: 5,
    image: 'https://picsum.photos/200',
  };

  it('renders correctly with given product details', () => {
    const { getByText, getByRole } = render(
      <NavigationContainer>
        <ListItem {...product} />
      </NavigationContainer>
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$100.00')).toBeTruthy();
    expect(getByText('Quantity: 5')).toBeTruthy();
  });

  it('navigates to ProductDetail on press', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ListItem {...product} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Test Product'));
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', { id: '1' });
  });
});

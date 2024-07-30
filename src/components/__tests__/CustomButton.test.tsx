import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../CustomButton';

describe('CustomButton Component', () => {
  it('renders correctly with given title', () => {
    const { getByText } = render(<CustomButton title="Click Me" onPress={() => {}} />);
    const buttonText = getByText('Click Me');
    
    expect(buttonText).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = { color: 'red' };
    const { getByText } = render(<CustomButton title="Click Me" onPress={() => {}} style={customStyle} />);
    const buttonText = getByText('Click Me');
    
    expect(buttonText.props.style).toMatchObject(customStyle);
  });

  it('handles press events', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<CustomButton title="Click Me" onPress={onPressMock} />);
    const button = getByText('Click Me');
    
    fireEvent.press(button);
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

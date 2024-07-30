import React from 'react';
import { render } from '@testing-library/react-native';
import Loader from '../Loading';

describe('Loader Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Loader />);
    const loader = getByTestId('loader');
    
    expect(loader).toBeTruthy();
    expect(loader.props.size).toBe('large');
    expect(loader.props.color).toBe('#0000ff');
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(<Loader size="small" color="#ff0000" />);
    const loader = getByTestId('loader');
    
    expect(loader).toBeTruthy();
    expect(loader.props.size).toBe('small');
    expect(loader.props.color).toBe('#ff0000');
  });
});

import '@testing-library/jest-dom';
import { useCounter } from './Calculator';
import renderer from 'react-test-renderer';
import App from './App';

const mockSetState = jest.fn();

jest.mock('react', () => ({
    useState: abc => [abc, mockSetState]
}));

test('Can increment from 1 to 2', () => {
    const [, increment] = useCounter(3);
    increment();
    expect(mockSetState).toHaveBeenCalledWith(4);
});

it('renders correctly when there are no items', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
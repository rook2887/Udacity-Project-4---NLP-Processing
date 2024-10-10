/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

import { handleSubmit } from './formHandler';

// Mocking the sendDataToServer function
jest.mock('./formHandler', () => ({
  ...jest.requireActual('./formHandler'),
  sendDataToServer: jest.fn(),
}));

describe('handleSubmit', () => {
  let event;

  beforeEach(() => {
    // Create a mock event object and set up a valid value
    event = {
      preventDefault: jest.fn(),
    };
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" value="http://example.com" />
      </form>
    `;
  });

//   tests
  test('should call sendDataToServer with the input value', () => {
    const { sendDataToServer } = require('./formHandler');

    handleSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(sendDataToServer).toHaveBeenCalledWith('http://example.com');
  });

  test('should alert if input is empty', () => {

    document.getElementById('name').value = '';
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    handleSubmit(event);

    expect(alertMock).toHaveBeenCalledWith('Please enter some text to analyze');
    alertMock.mockRestore();
  });
});
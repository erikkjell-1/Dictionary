import { test, expect, describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';
import { act } from 'react-dom/test-utils';


describe('making sure all the components have loaded in', () => {
  test('header to be visible', () => {
    render(<App />);
    expect(screen.getByText("Dictionary")).toBeInTheDocument();
  });
  test('input to be visible', () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Search for a word to get the definition")).toBeInTheDocument();
  });
  test('button to be visible', () => { 
    render(<App />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe('making sure the input is working', () => {
  test('input is working', () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Search for a word to get the definition");
    input.value = "test";
    expect(input.value).toBe("test");
  });
});

describe('making sure the error message is working', () => {
  test('error message is working', async () => {
    render(<App />);
    act(() => {
    const input = screen.getByPlaceholderText("Search for a word to get the definition");
    const button = screen.getByRole("button");
    input.value = "ssssss";
    button.click();
    waitFor(() => expect(screen.getByText("No match found for the entered word")).toBeInTheDocument());
    });
  });
});

describe('making sure the api is working', () => {
  test('api returns with info', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Search for a word to get the definition");
    const button = screen.getByRole("button");
    input.value = "test";
    button.click();
    waitFor(() => expect(screen.getByText("Definition: A challenge, trial.")).toBeInTheDocument());
  });
  test('api returns with phonetic', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Search for a word to get the definition");
    const button = screen.getByRole("button");
    input.value = "test";
    button.click();
    waitFor(() => expect(screen.getByText("Phonetic: /tɛst/")).toBeInTheDocument());
  });
  test('api returns with audio', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Search for a word to get the definition");
    const button = screen.getByRole("button");
    input.value = "test";
    button.click();
    waitFor(() => expect(screen.getByTestId("audio")).toBeInTheDocument());
  });
});
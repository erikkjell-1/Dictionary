import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App.jsx';

describe('find the search bar', () => {
  test('if a search bar can be found', () => {
    render(<App />)
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
  });

  test('if a search button can be found', () => {
    render(<App />)
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });
});
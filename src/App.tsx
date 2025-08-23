import './App.css';
import AgGridInfinite from './components/AgGridInfinite';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AgGridPage1 from './components/AgGridPage1';
import { Provider } from 'react-redux';
import store from './store/store';
import VscodeLayoutExample from './components/VscodeLayoutExample';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import React, { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <FluentProvider
      theme={theme === 'light' ? webLightTheme : webDarkTheme}
      style={{ height: '100%' }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          background: 'var(--colorNeutralBackground2)',
        }}
      >
        <Dropdown
          value={theme}
          onOptionSelect={(_, data) =>
            setTheme(data.optionValue as 'light' | 'dark')
          }
        >
          <Option value="light">Light</Option>
          <Option value="dark">Dark</Option>
        </Dropdown>
      </div>
      <Provider store={store}>
        <Router>
          <nav
            style={{
              padding: '1rem',
              background: 'var(--colorNeutralBackground2)',
              marginBottom: '1rem',
              color: 'var(--colorNeutralForeground1)',
              borderBottom: '1px solid var(--colorNeutralStroke2)',
            }}
          >
            <Link
              to="/"
              style={{
                marginRight: '1rem',
                color: 'var(--colorNeutralForeground1)',
              }}
            >
              Home
            </Link>
            <Link
              to="/page1"
              style={{ color: 'var(--colorNeutralForeground1)' }}
            >
              Page 1
            </Link>
            <Link
              to="/vscode-layout"
              style={{
                marginLeft: '1rem',
                color: 'var(--colorNeutralForeground1)',
              }}
            >
              VSCode Layout Example
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<AgGridInfinite theme={theme} />} />
            <Route path="/page1" element={<AgGridPage1 theme={theme} />} />
            <Route
              path="/vscode-layout"
              element={<VscodeLayoutExample theme={theme} />}
            />
          </Routes>
        </Router>
      </Provider>
    </FluentProvider>
  );
}

export default App;

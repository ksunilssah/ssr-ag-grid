import './App.css';
import AgGridInfinite from './components/AgGridInfinite';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AgGridPage1 from './components/AgGridPage1';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <nav
          style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}
        >
          <Link to="/" style={{ marginRight: '1rem' }}>
            Home
          </Link>
          <Link to="/page1">Page 1</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <AgGridInfinite />
              </div>
            }
          />
          <Route path="/page1" element={<AgGridPage1 />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

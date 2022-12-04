/* import logo from './logo.svg'; */
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { Body } from './components/Body';
import { ConvEuro } from './components/ConvEuro';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Body />} />
            <Route path='/conversiones' element={<ConvEuro />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

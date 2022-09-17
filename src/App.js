import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import ItemsList from './components/ItemsList';
import UserContext from './context/UserContext';
import AddItemForm from './components/AddItemForm';
import EditItemForm from './components/EditItemForm';
import { useContext } from 'react';

function App() {
  const user = useContext(UserContext)
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Header />
        <div className='main-content'>
          <BrowserRouter>
            <Routes>
              <Route path="/add" element={<AddItemForm />} />
              <Route path="/item/:id" element={<EditItemForm />} />
              <Route path="/" element={<ItemsList />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import Main from './pages/Main';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path='/register' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

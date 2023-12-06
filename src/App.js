import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import ListOfUsers from './components/ListofUsers';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewSubscriber from './components/NewSubscriber';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<NewSubscriber/>} ></Route>
        <Route path='/Subscribers' element={<ListOfUsers/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
// import UploadAndDisplayImage from './components/upload';
import ResponsiveAppBar from './components/Appbar';
import DataTable from './components/TableView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicTextFields from './components/InputDataField';
import UpdateProducts from './components/Update_Product';
function App() {
  return (
    <Router>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path='/add' element={<BasicTextFields></BasicTextFields>}></Route>
        <Route path='/' element={<DataTable></DataTable>}></Route>
        <Route path='/update' element={<UpdateProducts></UpdateProducts>}></Route>
      </Routes>
      
    </Router>


  );
}

export default App;

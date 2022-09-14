import './App.css';
// import UploadAndDisplayImage from './components/upload';
import ResponsiveAppBar from './components/Appbar';
import BasicTextFields from './components/InputDataField';
import  Box from '@mui/material/Box';
function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Box sx={{m:2,pt:2}}>
        <BasicTextFields></BasicTextFields>
        {/* <UploadAndDisplayImage></UploadAndDisplayImage> */}
      </Box>

    </div>
  );
}

export default App;

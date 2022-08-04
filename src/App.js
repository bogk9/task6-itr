import { MainView } from './components/MainView/MainView';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Box id="appwrapper">
          <MainView/>
        </Box>
      </div>
    </Provider>
  );
}

export default App;

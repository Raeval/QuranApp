import { AppProvider } from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultScreen from './screens/DefaultScreen';
import LogInScreen from './screens/LogInScreen';
import ReadScreen from './screens/ReadScreen';
import UserScreen from './screens/UserScreen';
import RegistrationScreen from './screens/RegistrationScreen';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Do for login/not log in */}
          <Route path="/" element={<DefaultScreen />} />
          <Route path="/login" element={<LogInScreen />} />
          <Route path="/register" element={<RegistrationScreen />} />
          <Route path="/loggedUser" element={<UserScreen />} />
          <Route path="/readQuran" element={<ReadScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App;

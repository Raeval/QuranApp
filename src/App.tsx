import { useState } from 'react';
import { AppContext } from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { User } from './utils/Types';
import DefaultScreen from './screens/DefaultScreen';
import LogInScreen from './screens/LogInScreen';
import ReadScreen from './screens/ReadScreen';
import UserScreen from './screens/UserScreen';
import RegistrationScreen from './screens/RegistrationScreen';

function App() {
  const [currUser, setCurrUser] = useState<User | null>(null);

  return (
    <AppContext.Provider
    value = {{
      currUser: currUser,
      setCurrUser: setCurrUser,
    }}>
      <BrowserRouter>
        <Routes>
          {/* Do for login/not log in */}
          <Route path="/" element={<RegistrationScreen />} />
          <Route path="/login" element={<LogInScreen />} />
          <Route path="/registration" element={<RegistrationScreen />} />
          <Route path="/loggedUser" element={<UserScreen />} />
          <Route path="/readQuran" element={<ReadScreen />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App;

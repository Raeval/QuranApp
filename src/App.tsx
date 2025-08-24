import { useState } from 'react';
import { AppContext } from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { User } from './utils/Types';
import DefaultScreen from './screens/DefaultScreen';
import LogInScreen from './screens/LoggedInScreen';

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
          <Route path="/" element={<LogInScreen />} />
          <Route path="/loggedUser" element={<LogInScreen />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App;

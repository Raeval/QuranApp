import { useState } from 'react';
import { AppContext } from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { User } from './utils/Types';
import DefaultScreen from './screens/DefaultScreen';
import LogInScreen from './screens/LoggedInScreen';
import ReadScreen from './screens/ReadScreen';

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
          <Route path="/" element={<ReadScreen />} />
          <Route path="/loggedUser" element={<LogInScreen />} />
          <Route path="/readQuran" element={<ReadScreen />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App;

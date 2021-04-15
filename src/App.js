import './App.css';
import { Navbar } from './containers';
import { UserContextProvider } from './contexts/user';
import { Home } from './pages';

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </UserContextProvider>
  );
}

export default App;

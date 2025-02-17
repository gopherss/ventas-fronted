import AppRouter from './routes/AppRouter';
import ThemeSwitcher from './components/ThemeSwitcher';
import { Toaster } from 'react-hot-toast';

const App = () => {

  return (
    <>
      <Toaster />
      <div>
        <ThemeSwitcher />
        <AppRouter />
      </div>
    </>
  );
};

export default App;
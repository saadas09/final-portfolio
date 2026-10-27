import { MotionProvider } from './components/MotionProvider';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
export default function App() {
  return (
    <MotionProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </MotionProvider>
  );
}

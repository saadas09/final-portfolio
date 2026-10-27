import { MotionConfig } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MainLayout>
        <Home />
      </MainLayout>
    </MotionConfig>
  );
}

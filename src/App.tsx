import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AIExperts from './pages/AIExperts';
import AIProjects from './pages/AIProjects';
import TechYoutubers from './pages/TechYoutubers';
import ThreeDPrinting from './pages/3DPrinting';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import Blockchain from './pages/Blockchain';
import BlockchainSources from './pages/BlockchainSources';
import BlockchainEnergyAnalysis from './pages/BlockchainEnergyAnalysis';
import Resources from './pages/Resources';
import MicrosoftOffice from './pages/MicrosoftOffice';
import MentionsLegales from './pages/MentionsLegales';
import IdeasRepas from './pages/IdeasRepas';
import ShoppingLists from './pages/ShoppingLists';
import RandomMeal from './pages/RandomMeal';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-experts" element={<AIExperts />} />
              <Route path="/ai-projects" element={<AIProjects />} />
              <Route path="/tech-youtubers" element={<TechYoutubers />} />
              <Route path="/3d-printing" element={<ThreeDPrinting />} />
              <Route path="/blockchain" element={<Blockchain />} />
              <Route path="/blockchain-sources" element={<BlockchainSources />} />
              <Route path="/blockchain-energy-analysis" element={<BlockchainEnergyAnalysis />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/microsoft-office" element={<MicrosoftOffice />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/admin" element={<Admin />} />
              <Route 
                path="/admin-dashboard" 
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/ideas-repas" 
                element={
                  <PrivateRoute>
                    <IdeasRepas />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/random-meal" 
                element={
                  <PrivateRoute>
                    <RandomMeal />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/shopping-lists" 
                element={
                  <PrivateRoute>
                    <ShoppingLists />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

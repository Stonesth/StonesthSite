import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AIExperts from './pages/AIExperts';
import AIProjects from './pages/AIProjects';
import TechYoutubers from './pages/TechYoutubers';
import ThreeDPrinting from './pages/3DPrinting';
import Admin from './pages/Admin';
import Blockchain from './pages/Blockchain';
import BlockchainSources from './pages/BlockchainSources';
import BlockchainEnergyAnalysis from './pages/BlockchainEnergyAnalysis';

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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-experts" element={<AIExperts />} />
          <Route path="/ai-projects" element={<AIProjects />} />
          <Route path="/tech-youtubers" element={<TechYoutubers />} />
          <Route path="/3d-printing" element={<ThreeDPrinting />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/blockchain-sources" element={<BlockchainSources />} />
          <Route path="/blockchain-energy-analysis" element={<BlockchainEnergyAnalysis />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

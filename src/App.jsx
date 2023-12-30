import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
//import NavBar from './components/NavBar';
import TaskTable from './components/TaskTable';
import LineChart from './components/LineChart';
//import { Line } from 'react-chartjs-2';
import NamePage from './components/NamePage';
import ArticleGrid from './components/ArticleGrid';
import Article from './components/Article'; // Import the new Article component
//import CallToActionWithVideo from './components/CallToActionWithVideo';
//import DropdownNavigation from './components/DropdownNavigation';
import WithSubnavigation from './components/WithSubnavigation';
import NameExplorer from './components/NameExplorer';
//import HorizontalArticleGrid from './components/HorizontalArticleGrid';

function App() {

  return (
    
    <Router>
      <WithSubnavigation />        
      <Box maxW={1200} mx="auto" px={6} pt={24} fontSize="sm">
      <Routes>
          <Route path="/" element={<NameExplorer />} />
          <Route path="/TaskTable" element={<TaskTable />} />
          <Route path="/ArticleGrid" element={<ArticleGrid />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="NamePage/:name" element={<NamePage />} />
          {/* ... other routes */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;





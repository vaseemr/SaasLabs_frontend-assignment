import ProjectTable from './components/projectTable';
import Pagination from './components/pagination';
import './App.css';
import { useState,useEffect } from 'react';
import Header from './components/header';

import Footer from './components/footer';

function App() {

const API_URL = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5;
const [projects, setProjects] = useState([]);
const [status,setStatus] = useState();


useEffect(() => {
  const loadProjects = async () => {
       setStatus("loading");
       await fetch(API_URL).then(async function(response){
       setProjects(await response.json());
       setTimeout(()=>{ 
        setStatus("success");
       },1000) // remove this timeout when running App.test.js
        
      }).catch(error =>
        {
        setStatus("failed");
        console.error("Error fetching data:", error)}
      );
  };
  loadProjects();
}, []);

const totalPages = Math.ceil(projects.length / recordsPerPage);
  const currentProjects = projects.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

return (
  <>
  <Header/>
<div className="app-container">
   <ProjectTable projects={currentProjects} status={status} recordsPerPage={recordsPerPage} />
   <Pagination
         currentPage={currentPage}
         totalPages={totalPages}
         onPageChange={setCurrentPage}
       />
</div>
<Footer/>
</>
);
}

export default App;

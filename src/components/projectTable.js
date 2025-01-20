import React from 'react';
import Spinner from './spinner';
const ProjectTable=({projects,status,recordsPerPage})=> (
<table className='project-table'>
    <thead>
        <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
        </tr>
        </thead>
       
        <tbody >
        {status==="failed" &&  <tr><td colSpan={3} > Data fetch failed.</td></tr> }
        {status==="loading" &&  <tr><td colSpan={3}> <Spinner /></td></tr> }
        {status==="success" && Array.from({ length: 5 }).map((_, index)  => {
            const project = projects[index];
       return (
        project ? 
        (<tr key={index}>
            <td data-testid="s.no">{project["s.no"]}</td>
            <td data-testid="percentage.funded">{project["percentage.funded"]}</td>
            <td data-testid="amt.pledged">{project["amt.pledged"]}</td>
        </tr>)
         :
        (<tr key={index}>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>)
    
    )})}
    </tbody>
</table>
);

export default ProjectTable;
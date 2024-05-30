import React, { useEffect, useState } from 'react';
import './tmp_css.css';
import data from './tmp_data.json';

const TmpTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, []);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>String</th>
            <th>Description</th>
            <th>Checked</th>
            <th>Name</th>
            <th>Port</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td data-label="Type">{item.type}</td>
              <td data-label="String">{item.string}</td>
              <td data-label="Description">{item.description}</td>
              <td data-label="Checked">{item.checked}</td>
              <td data-label="Name">{item.name}</td>
              <td data-label="Port">{item.port}</td>
              <td data-label="Status">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TmpTable;

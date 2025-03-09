import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from 'primereact/button';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const SHEQAuditView = () => {
  const [loading, setLoading] = useState(false);

  const downloadFile = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://localhost:5001/api/sheqaudit/process', {}, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'report.xlsx');
    } catch (error) {
      console.error('Error downloading the file', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>SHEQ Audit View</h1>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <Button
        label="Download Excel"
        icon="pi pi-download"
        onClick={downloadFile}
        loading={loading}
        className="p-button-primary mt-4"
      />
    </div>
  );
};

export default SHEQAuditView;
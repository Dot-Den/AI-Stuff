import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from 'primereact/button';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const InitialSHEQAuditView = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  
  // Handle the file upload
  const handleUpload = async (event: FileUploadHandlerEvent) => {
    const file = event.files[0];
    if (!file) {
      setResponse('Please select a file.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('csv', file);

      // Send the CSV file to OpenWebUI API
      const openwebuiResponse = await axios.post('http://localhost:3000/api/model/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',  // to handle file responses
      });

      // Process the returned file (for example, a CSV file)
      const blob = new Blob([openwebuiResponse.data], { type: 'text/csv' });
      saveAs(blob, 'processed_report.csv');
      
      setResponse('File processed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponse('Error processing the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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

      <Card title="Upload CSV for AI Processing">
        <FileUpload
          mode="basic"
          name="csv"
          accept=".csv"
          customUpload
          uploadHandler={handleUpload}
          chooseLabel="Select CSV"
          className="p-mb-3"
        />
        <Button
          label="Upload & Process"
          icon="pi pi-upload"
          loading={loading}
          className="p-button-success p-mt-2"
          onClick={() => {
            const fileInput = document.querySelector("input[type=file]") as HTMLInputElement;
            if (fileInput?.files?.[0]) {
              handleUpload({ files: [fileInput.files[0]] } as FileUploadHandlerEvent);
            }
          }}
        />

        {response && (
          <Message severity="info" text={response} className="p-mt-3" />
        )}
      </Card>
    </div>
  );
};

export default InitialSHEQAuditView;
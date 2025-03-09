import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Button } from 'primereact/button';

const DownloadExcel = () => {
  const downloadFile = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'file.xlsx');
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  return (
    <Button label="Download Excel" icon="pi pi-download" onClick={downloadFile} />
  );
};

export default DownloadExcel;
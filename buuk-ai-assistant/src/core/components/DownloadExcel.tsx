import axios from 'axios';
import { saveAs } from 'file-saver';
import { Button } from 'primereact/button';

const DownloadExcel = () => {
  const downloadFile = async () => {
    try {
      const response = await axios.post('https://localhost:5001/api/sheqaudit/process', {}, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'report.xlsx');
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  return (
    <Button label="Download Excel" icon="pi pi-download" onClick={downloadFile} />
  );
};

export default DownloadExcel;
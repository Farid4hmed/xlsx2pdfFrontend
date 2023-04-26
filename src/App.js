import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('document', selectedFile);
    try {
      const response = await axios.post('https://xlsxtopdfbackend.onrender.com/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = 'converted.pdf';
      link.click();
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>XLSX to PDF Converter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile}>
        {isLoading? "Converting...": "Convert To Pdf"}
        </button>
      </form>
      
    </div>
  );
}

export default App;

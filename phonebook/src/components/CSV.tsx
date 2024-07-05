import { exportToCsv, importFromCsv } from '../utils/csvUtils';

const handleExportToCsv = () => {
    const csvData = exportToCsv(contacts);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contacts.csv');
    document.body.appendChild(link);
    link.click();
  };

  const handleImportFromCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target?.result as string;
        const importedContacts = importFromCsv(csvData);
        setContacts(importedContacts);
      };
      reader.readAsText(file);
    }
  };

  <button onClick={handleExportToCsv}>Экспортировать в CSV</button>
  <input type="file" accept=".csv" onChange={handleImportFromCsv} />

  default export CSV;
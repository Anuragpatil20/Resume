import { useState } from 'react';
import axios from 'axios';

const UserCard = ({ user }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || file.type !== 'application/pdf') {
      return setStatus('Only PDF files are allowed');
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/users/${user._id}/upload-resume", formData);
      setStatus('Resume uploaded successfully');
    } catch (error) {
      setStatus('Upload failed');
    } finally {
      setLoading(false);
    }   
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
 
   

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mt-2"
      />

      <button
        onClick={handleUpload}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        {loading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {status && <p className="mt-1 text-sm text-green-600">{status}</p>}
    </div>
  );
};

export default UserCard;

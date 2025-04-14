import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const res = await axios.get('http://localhost:5000/resumes');
      setResumes(res.data);
    };
    fetchResumes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Resume Viewer</h1>
      <table className="table-auto w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume._id} className="border-t">
              <td className="px-4 py-2">{resume.userId.name}</td>
              <td className="px-4 py-2">{resume.userId.email}</td>
              <td className="px-4 py-2">
                <a
                  href={`http://localhost:5000/${resume.filePath}`}
                  download
                  className="text-blue-500 underline"
                >
                  Download
                </a>
              </td>
              <td className="px-4 py-2">{new Date(resume.uploadedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminResumeList;

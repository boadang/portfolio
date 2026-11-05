import React, { useEffect, useState } from 'react';
import { fetchProjects } from './services/api';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2">My Portfolio</h1>
          <p className="text-slate-400">Chào mừng đến với trang cá nhân của tôi (React + Node.js)</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b border-slate-700 pb-2">Dự án nổi bật</h2>
          
          {loading ? (
            <p className="text-center text-slate-400">Đang tải dữ liệu...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-slate-400">Chưa có dự án nào được thêm vào cơ sở dữ liệu.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((tech, index) => (
                      <span key={index} className="bg-blue-900/50 text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm font-medium">
                      Xem GitHub &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
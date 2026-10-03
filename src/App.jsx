import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext.jsx';
import Header from './components/Header.jsx';
import RequestForm from './components/RequestForm.jsx';
import RequestList from './components/RequestList.jsx';
import QueueSummary from './components/QueueSummary.jsx';

export default function App() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('All');

  //task3 starts here. this was a doozy
  //state initializer to browser local storage
  const [requests, setRequests] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("helpdesk-requests") ?? "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("helpdesk-requests", JSON.stringify(requests));
    } catch {
      console.warn("Failed to save requests to local storage.");
    }
  }, [requests]);

  const waitingCount = requests.filter(req => req.status === "Waiting").length;

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Helpdesk Queue (${waitingCount} waiting)`;
    return () => {
      document.title = originalTitle;
    };
  }, [waitingCount]);
  //task 3 ends here

  const addRequest = (newRequest) => {
    setRequests(previous => [...previous, newRequest]);
  };

  const resolveRequest = (id) => {
    setRequests(previous =>
      previous.map(request =>
        request.id === id ? { ...request, status: 'Resolved' } : request
      )
    );
  };

  const deleteRequest = (id) => {
    setRequests(previous =>
      previous.filter(request => request.id !== id)
    );
  };

  return (
    <div className={`app-container ${theme}`}>
      <Header />
      <main>
        <RequestForm onAddRequest={addRequest} />
        
        <section className="queue-controls">
          <label htmlFor="statusFilter">Filter Status: </label>
          <select id="statusFilter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Waiting">Waiting</option>
            <option value="Resolved">Resolved</option>
          </select>
        </section>

        <QueueSummary requests={requests} />
        <RequestList 
          requests={requests} 
          filter={filter} 
          onResolve={resolveRequest} 
          onDelete={deleteRequest} 
        />
      </main>
    </div>
  );
}
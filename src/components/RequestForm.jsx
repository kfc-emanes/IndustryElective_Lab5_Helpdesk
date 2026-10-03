import React, { useState } from 'react';

export default function RequestForm({ onAddRequest }) {

    const [studentName, setStudentName] = useState('');
    const [concern, setConcern] = useState('');
    const [priority, setPriority] = useState('Normal');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!studentName.trim || !concern.trim()) return;

        const newRequest = {
            id: crypto.randomUUID(),
            studentName: studentName.trim(),
            concern: concern.trim(),
            priority,
            status: "Waiting",
            createdAt: Date.now()
        };

        onAddRequest(newRequest);

        setStudentName('');
        setConcern('');
        setPriority('Normal');
    };

    return (
        <form className="request-form" onSubmit={handleSubmit}>
            <h2>Request Assistance</h2>
                <div>
                    <label htmlFor="studentName">Student Name:</label>
                    <input 
                    type="text"
                    id="studentName"
                    placeholder="Enter your name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="concern">Concern:</label>
                    <textarea
                    id="concern"
                    placeholder="Describe your issue..."
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}    
                />
                </div>
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Normal">Normal</option>
                        <option value="Urgent">High</option>
                    </select>
                </div>
                <button type="submit">Submit Request</button>
        </form>
    );
}
import React, { useState, useEffect, useRef } from 'react';

export default function RequestForm({ onAddRequest }) {

    const [studentName, setStudentName] = useState('');
    const [concern, setConcern] = useState('');
    const [priority, setPriority] = useState('Normal');

    const nameInputRef = useRef(null);
    const concernInputRef = useRef(null);

    //task4 here, useEffect and now useRef
    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!studentName.trim()) {
            nameInputRef.current?.focus();
            return;
        }
        if (!concern.trim()) {
            concernInputRef.current?.focus();
            return;
        }

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

        nameInputRef.current?.focus();
    };

    return (
        <form className="request-form" onSubmit={handleSubmit}>
            <h2>Request Assistance</h2>
            <div>
                <label htmlFor="studentName">Student Name:</label>
                <input 
                    type="text"
                    id="studentName"
                    ref={nameInputRef}
                    placeholder="Enter your name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="concern">Concern:</label>
                <textarea
                    id="concern"
                    ref={concernInputRef}
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
                    <option value="High">High</option>
                </select>
            </div>
            <button type="submit">Submit Request</button>
        </form>
    );
}
import React from 'react';

export default function RequestCard({ request }) {
    return (
        <div className={`request-card ${request.priority.toLowerCase()}`}>
                <h3>{request.studentName} <span>({request.priority} Priority)</span></h3>
                <p><strong>Status:</strong> {request.status}</p>
                <p><strong>Concern:</strong> {request.concern}</p>
                
                <div className="card-actions">
                    {request.status === "Waiting" && (
                        <button onClick={() => onResolve(request.id)}>Resolve</button>
                    )}
                    <button onClick={() => onDelete(request.id)}>Delete</button>
                </div>
            </div>
    );
}
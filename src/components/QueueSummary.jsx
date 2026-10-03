import React from 'react';

export default function QueueSummary({ requests }) {
    const waiting = requests.filter(req => req.status === "Waiting").length;
    const resolved = requests.filter(req => req.status === "Resolved").length;

    return (
        <div className="queue-summary">
            {/* <h2>Queue Summary</h2>
            <p>Waiting: {waiting}</p>
            <p>Resolved: {resolved}</p> */}

            <p>Waiting: {waiting} | Resolved: {resolved} | Total: {requests.length}</p>
        </div>
    );
}
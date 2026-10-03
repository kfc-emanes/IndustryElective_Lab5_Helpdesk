import React from 'react';
import RequestCard from './RequestCard.jsx';

export default function RequestList({ requests, filter, onResolve, onDelete }) {
    const filteredRequests = requests.filter(req => filter === 'All' || req.status === filter);

    const sortedRequests = [...filteredRequests].sort((a, b) => {
        if (a.priority === b.priority) {
            return a.createdAt - b.createdAt;
        }
        return a.priority === 'High' ? -1 : 1;
    });

    return (
        <div className="request-list">
            {sortedRequests.map(request => (
                <RequestCard
                    key={request.id}
                    request={request}
                    onResolve={onResolve}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
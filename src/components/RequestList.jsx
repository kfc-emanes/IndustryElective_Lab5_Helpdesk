import React from 'react';
import RequestCard from './RequestCard.jsx';

export default function RequestList({ requests, filter }) {
    const filteredRequests = requests.filter(req => filter === 'All' || req.status === filter);

    return (
        <div className="request-list">
            {filteredRequests.map(request => (
                <RequestCard key={request.id} request={request} />
            ))}
        </div>
    );
}
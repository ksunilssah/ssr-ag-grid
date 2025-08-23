import React from 'react';

const QueryComponent: React.FC<{ queries: string[] }> = ({ queries }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <h4 style={{ margin: 0, color: 'var(--colorNeutralForeground1)' }}>
      Recent Queries
    </h4>
    <ul style={{ color: 'var(--colorNeutralForeground1)', paddingLeft: 16 }}>
      {queries.length === 0 ? (
        <li style={{ color: '#aaa' }}>No queries yet.</li>
      ) : (
        queries.map((q, i) => <li key={i}>{q}</li>)
      )}
    </ul>
  </div>
);

export default QueryComponent;

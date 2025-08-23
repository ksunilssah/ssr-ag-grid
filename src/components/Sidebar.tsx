import React from 'react';
import { Button } from '@fluentui/react-components';
import { SearchRegular, DatabaseSearchRegular } from '@fluentui/react-icons';

const Sidebar: React.FC<{
  onOpenPanel: (type: string) => void;
  active: 'search' | 'query' | null;
}> = ({ onOpenPanel, active }) => {
  return (
    <div
      style={{
        background: 'var(--colorNeutralBackground2)',
        color: 'var(--colorNeutralForeground1)',
        height: '100%',
        padding: '10px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <li>
          <Button
            appearance={
              active === 'search'
                ? 'primary'
                : active === null
                ? 'outline'
                : 'subtle'
            }
            size="small"
            icon={<SearchRegular />}
            onClick={() => onOpenPanel('search')}
          />
        </li>
        <li>
          <Button
            appearance={
              active === 'query'
                ? 'primary'
                : active === null
                ? 'outline'
                : 'subtle'
            }
            size="small"
            icon={<DatabaseSearchRegular />}
            onClick={() => onOpenPanel('query')}
          />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

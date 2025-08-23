import React, { useState } from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { Button, makeStyles } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

import Sidebar from './Sidebar';
import SearchComponent from './SearchComponent';
import QueryComponent from './QueryComponent';
import styles from './VscodeLayoutExample.module.css';
import AgGridInfinite from './AgGridInfinite';

const usePanelStyles = makeStyles({
  root: {
    background: 'var(--colorNeutralBackground3)',
    color: 'var(--colorNeutralForeground1)',
    height: '100%',
    padding: '16px',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    zIndex: 2,
  },
});

const Editor = () => (
  <div className={styles.editor}>
    <AgGridInfinite />
  </div>
);

const Panel: React.FC<{
  type: string;
  onClose: () => void;
  onSearch?: (query: string) => void;
  queries?: string[];
}> = ({ type, onClose, onSearch, queries }) => {
  const styles = usePanelStyles();
  return (
    <div className={styles.root}>
      <Button
        className={styles.closeBtn}
        size="small"
        appearance="secondary"
        icon={<DismissRegular />}
        onClick={onClose}
      />
      <h4 style={{ margin: 0 }}>
        {type === 'search' ? 'Search Panel' : 'Query Panel'}
      </h4>
      <div style={{ marginTop: 8 }}>
        {type === 'search' ? (
          <SearchComponent onSearch={onSearch!} />
        ) : (
          <QueryComponent queries={queries || []} />
        )}
      </div>
    </div>
  );
};

const VscodeLayoutExample: React.FC<{ theme: 'light' | 'dark' }> = ({
  theme,
}) => {
  const [panelType, setPanelType] = useState<string | null>(null);
  const [queries, setQueries] = useState<string[]>([]);
  const [sidebarActive, setSidebarActive] = useState<'search' | 'query' | null>(
    null
  );

  const handleSidebarOpen = (type: string) => {
    setPanelType(type);
    setSidebarActive(type as 'search' | 'query');
  };

  const handlePanelClose = () => {
    setPanelType(null);
    setSidebarActive(null);
  };

  const handleSearch = (query: string) => {
    setQueries((qs) => [query, ...qs]);
    setPanelType('query');
    setSidebarActive('query');
  };

  // Get current time based on theme
  const getTime = () => {
    const now = new Date();
    if (theme === 'dark') {
      // Show UTC time for dark theme
      return now.toUTCString().slice(17, 25);
    } else {
      // Show local time for light theme
      return now.toLocaleTimeString();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.time}>{getTime()}</span>
      </div>
      <Allotment>
        <Allotment.Pane minSize={35} maxSize={35} preferredSize={35}>
          <Sidebar onOpenPanel={handleSidebarOpen} active={sidebarActive} />
        </Allotment.Pane>
        {panelType && (
          <Allotment.Pane minSize={180} preferredSize={220} snap>
            <Panel
              type={panelType}
              onClose={handlePanelClose}
              onSearch={handleSearch}
              queries={queries}
            />
          </Allotment.Pane>
        )}
        <Allotment.Pane minSize={300}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Editor />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default VscodeLayoutExample;

import React, { useState } from 'react';
import {
  Button,
  RadioGroup,
  Radio,
  Textarea,
} from '@fluentui/react-components';

const SearchComponent: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [radio, setRadio] = useState('state');
  const [text, setText] = useState('');

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(`${radio}: ${text}`);
      }}
    >
      <RadioGroup
        value={radio}
        onChange={(_, data) => setRadio(data.value)}
        style={{ display: 'flex', gap: 16 }}
      >
        <Radio value="state" label="State" />
        <Radio value="country" label="Country" />
      </RadioGroup>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your search..."
        resize="vertical"
        style={{ minHeight: 60 }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          type="button"
          appearance="secondary"
          onClick={() => setText('')}
        >
          Clear
        </Button>
        <Button type="submit" appearance="primary">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchComponent;

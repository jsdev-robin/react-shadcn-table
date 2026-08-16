'use client';

import { Button } from '@/components/ui/button';
import { Columns3, Filter, GripVertical, Rows3, Settings } from 'lucide-react';
import { useState } from 'react';
import ToolbarRightColumns from './ToolbarRightColumns';
import ToolbarRightDnd from './ToolbarRightDnd';
import ToolbarRightFilter from './ToolbarRightFilter';
import ToolbarRightRows from './ToolbarRightRows';

const ToolbarRight = ({ height }: { height: number }) => {
  'use no memo';
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const style = {
    width: 208,
    borderLeft: '1px solid var(--border)',
    height: '100%',
  };

  return (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        height: height,
        borderBottom: '1px solid var(--border)',
      }}
    >
      {activePanel === 'columns' && (
        <div style={style}>
          <ToolbarRightColumns />
        </div>
      )}

      {activePanel === 'rows' && (
        <div style={style}>
          <ToolbarRightRows />
        </div>
      )}

      {activePanel === 'filter' && (
        <div style={style}>
          <ToolbarRightFilter />
        </div>
      )}

      {activePanel === 'dnd' && (
        <div style={style}>
          <ToolbarRightDnd />
        </div>
      )}

      {activePanel === 'settings' && <div style={style}>ToolbarSettings</div>}

      <div
        style={{
          width: 28,
          borderLeft: '1px solid var(--border)',
        }}
      >
        {[
          { value: 'columns', label: 'Columns', icon: Columns3 },
          { value: 'rows', label: 'Rows', icon: Rows3 },
          { value: 'filter', label: 'Filter', icon: Filter },
          { value: 'dnd', label: 'Dnd', icon: GripVertical },
          { value: 'settings', label: 'Settings', icon: Settings },
        ].map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            onClick={() => togglePanel(value)}
            variant={activePanel === value ? 'secondary' : 'ghost'}
            style={{
              writingMode: 'vertical-rl',
              minWidth: 28,
              width: 28,
              fontSize: 12,
              height: 'auto',
              borderRadius: 'none',
            }}
          >
            <Icon size={14} />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ToolbarRight;

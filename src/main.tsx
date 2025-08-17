import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.css';
import App from './App.tsx';
import {
  PaginationModule,
  CustomFilterModule,
  DateFilterModule,
  TextFilterModule,
  NumberFilterModule,
  ModuleRegistry,
  ColumnApiModule,
} from 'ag-grid-community';

import {
  InfiniteRowModelModule,
  ValidationModule,
  SetFilterModule,
  MultiFilterModule,
  GroupFilterModule,
  ServerSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
} from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  InfiniteRowModelModule,
  ValidationModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  SetFilterModule,
  MultiFilterModule,
  GroupFilterModule,
  CustomFilterModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  ServerSideRowModelModule,
  ColumnApiModule,
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

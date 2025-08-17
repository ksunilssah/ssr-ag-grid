import React, { useRef, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import { setGridState } from '../store/gridSlice';
import 'ag-grid-enterprise';

const columnDefs = [
  { field: 'id', sortable: true, filter: true },
  { field: 'name', sortable: true, filter: true },
  { field: 'age', sortable: true, filter: true },
  { field: 'country', sortable: true, filter: true },
  { field: 'email', sortable: true, filter: true },
  { field: 'city', sortable: true, filter: true },
  { field: 'status', sortable: true, filter: true },
  { field: 'score', sortable: true, filter: true },
  { field: 'registered', sortable: true, filter: true },
  { field: 'phone', sortable: true, filter: true },
  { field: 'department', sortable: true, filter: true },
  { field: 'notes', sortable: false, filter: true },
];

const AgGridPage1: React.FC = () => {
  const gridRef = useRef<any>(null);
  const dispatch = useDispatch();
  const gridState = useSelector((state: any) => state.grid.state);

  const datasource = {
    getRows: (params: any) => {
      fetch('http://localhost:4000/api/page1rows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startRow: params.request.startRow,
          endRow: params.request.endRow,
          sortModel: params.request.sortModel,
          filterModel: params.request.filterModel,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          params.success({ rowData: data.rows });
        })
        .catch(() => params.fail());
    },
  };

  useEffect(() => {
    if (gridRef.current && gridState) {
      const api = gridRef.current.api;
      const columnApi = gridRef.current.columnApi;
      if (api && columnApi) {
        api.setFilterModel(gridState.filterModel);
        columnApi.applyColumnState({ state: gridState.columnState });
      }
    }
  }, [gridState]);

  useEffect(() => {
    return () => {
      if (gridRef.current && gridRef.current.api && gridRef.current.columnApi) {
        dispatch(
          setGridState({
            filterModel: gridRef.current.api.getFilterModel(),
            columnState: gridRef.current.columnApi.getColumnState(),
          })
        );
      }
    };
  }, [dispatch]);

  const onGridReady = useCallback(
    (params: any) => {
      params.api.setGridOption('serverSideDatasource', datasource);
    },
    [datasource]
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 350 }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowModelType="serverSide"
        cacheBlockSize={100}
        maxBlocksInCache={2}
        paginationPageSize={100}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default AgGridPage1;

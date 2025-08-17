import React, { useRef, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import { setGridState } from '../store/gridSlice';
import 'ag-grid-enterprise';

const columnDefs = [
  { field: 'id', sortable: true, filter: 'agNumberColumnFilter' },
  { field: 'name', sortable: true, filter: 'agTextColumnFilter' },
  { field: 'age', sortable: true, filter: 'agNumberColumnFilter' },
  { field: 'country', sortable: true, filter: 'agTextColumnFilter' },
];

const AgGridInfinite: React.FC = () => {
  const gridRef = useRef<any>(null);
  const dispatch = useDispatch();
  const gridState = useSelector((state: any) => state.grid.state);

  const datasource = {
    getRows: async (params: any) => {
      try {
        const response = await fetch('http://localhost:4000/api/rows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            startRow: params.request.startRow,
            endRow: params.request.endRow,
            sortModel: params.request.sortModel,
            filterModel: params.request.filterModel,
          }),
        });
        const data = await response.json();
        params.success({ rowData: data.rows });
      } catch (error) {
        params.fail();
      }
    },
  };

  const onFilterChanged = () => {
    const api = gridRef.current.api;
    dispatch(
      setGridState({
        filterModel: api.getFilterModel(),
        columnState: api.getColumnState(),
      })
    );
  };

  const onSortChanged = () => {
    const api = gridRef.current.api;
    dispatch(
      setGridState({
        filterModel: api.getFilterModel(),
        columnState: api.getColumnState(),
      })
    );
  };

  useEffect(() => {
    // Restore filter and column state only after grid is ready and available
    if (
      gridRef.current &&
      gridRef.current.api &&
      gridState &&
      (gridState.filterModel || gridState.columnState)
    ) {
      requestAnimationFrame(() => {
        if (gridState.filterModel) {
          gridRef.current.api.setFilterModel(gridState.filterModel);
        }
        if (gridState.columnState) {
          gridRef.current.api.applyColumnState({
            state: gridState.columnState,
          });
        }
      });
    }
  }, [gridState]);

  const onGridReady = (params: any) => {
    params.api.setGridOption('serverSideDatasource', datasource);
    if (gridState && gridState.filterModel) {
      params.api.setFilterModel(gridState.filterModel);
    }
    if (gridState && gridState.columnState) {
      params.api.applyColumnState({ state: gridState.columnState });
    }
  };

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
        onFilterChanged={onFilterChanged}
        onSortChanged={onSortChanged}
      />
    </div>
  );
};

export default AgGridInfinite;

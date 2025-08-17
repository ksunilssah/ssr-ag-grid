export function createRows(start, end, sortModel, filterModel) {
  let rows = [];
  for (let i = start; i < end; i++) {
    rows.push({
      id: i,
      name: `Name ${i}`,
      age: 20 + (i % 30),
      country: ['USA', 'India', 'UK', 'Canada'][i % 4],
    });
  }
  // Filtering
  if (filterModel && filterModel.country && filterModel.country.values) {
    rows = rows.filter((row) =>
      filterModel.country.values.includes(row.country)
    );
  }
  // Sorting
  if (sortModel && sortModel.length > 0) {
    const { colId, sort } = sortModel[0];
    rows.sort((a, b) => {
      if (a[colId] < b[colId]) return sort === 'asc' ? -1 : 1;
      if (a[colId] > b[colId]) return sort === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return rows;
}

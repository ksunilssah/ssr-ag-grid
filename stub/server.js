import express from 'express';
import cors from 'cors';
import { createRows } from './stubData.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/api/rows', (req, res) => {
  const { startRow, endRow, sortModel, filterModel } = req.body;
  const totalRows = 1000;
  let rows = createRows(startRow, endRow, sortModel, filterModel);
  res.json({
    rows,
    lastRow: totalRows,
  });
});

const createPage1Rows = (start, end, sortModel, filterModel) => {
  let rows = [];
  for (let i = start; i < end; i++) {
    rows.push({
      id: i,
      name: `Page1 Name ${i}`,
      age: 30 + (i % 20),
      country: ['France', 'Germany', 'Italy', 'Spain'][i % 4],
      email: `user${i}@example.com`,
      city: ['Paris', 'Berlin', 'Rome', 'Madrid'][i % 4],
      status: ['Active', 'Inactive', 'Pending', 'Blocked'][i % 4],
      score: Math.floor(Math.random() * 100),
      registered: `2023-${(i % 12) + 1}-01`,
      phone: `+33${100000000 + i}`,
      department: ['Sales', 'Tech', 'HR', 'Finance'][i % 4],
      notes: `Note for user ${i}`,
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
};

app.post('/api/page1rows', (req, res) => {
  const { startRow, endRow, sortModel, filterModel } = req.body;
  const totalRows = 10000;
  let rows = createPage1Rows(startRow, endRow, sortModel, filterModel);
  res.json({
    rows,
    lastRow: totalRows,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

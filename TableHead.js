import TableRow from './TableRow.js';

const TableHead = ({ head }) => {
  return (
    <thead>
      <tr>
        <TableRow row={head} isHead={true} />
      </tr>
    </thead>
  );
};

export default TableHead;

import TableRow from './TableRow.js';

const TableBody = ({ body }) => {
  return (
    <tbody>
      {body.map((item) => (
        <tr key={item['№']}>
          <TableRow row={Object.values(item)} isHead={false} />
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

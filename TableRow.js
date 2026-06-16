const TableRow = ({ row, isHead }) => {
  const Cell = isHead ? 'th' : 'td';

  return (
    <>
      {row.map((item, index) => (
        <Cell key={index}>{item}</Cell>
      ))}
    </>
  );
};

export default TableRow;

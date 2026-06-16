import { useEffect, useMemo, useState } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter, { initialFilters } from './Filter.js';
import SortPanel from './SortPanel.js';

const emptySortRules = [
  { field: '', direction: 'asc' },
  { field: '', direction: 'asc' },
  { field: '', direction: 'asc' }
];

const columns = [
  { field: 'number', label: '№' },
  { field: 'name', label: 'Имя героя' },
  { field: 'roles', label: 'Роли' },
  { field: 'attribute', label: 'Главный атрибут' },
  { field: 'strength', label: 'Сила' },
  { field: 'agility', label: 'Ловкость' },
  { field: 'intelligence', label: 'Интеллект' },
  { field: 'combat', label: 'Тип атаки' }
];

const compareValues = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b), 'ru', { numeric: true, sensitivity: 'base' });
};

const isInRange = (value, from, to) => {
  const min = from === '' ? -Infinity : Number(from);
  const max = to === '' ? Infinity : Number(to);
  return value >= min && value <= max;
};

const getUniqueValues = (items) => (
  [...new Set(items)]
    .filter(Boolean)
    .sort((first, second) => String(first).localeCompare(String(second), 'ru'))
);

const getSortValue = (item, field) => {
  const hero = item.hero;

  switch (field) {
    case 'number':
      return item.index + 1;
    case 'roles':
      return hero.roles.join(', ');
    case 'strength':
    case 'agility':
    case 'intelligence':
      return Number(hero[field]);
    default:
      return hero[field];
  }
};

const createTableRow = (item) => ({
  '№': item.index + 1,
  'Имя героя': item.hero.name,
  'Роли': item.hero.roles.join(', '),
  'Главный атрибут': item.hero.attribute,
  'Сила': item.hero.strength,
  'Ловкость': item.hero.agility,
  'Интеллект': item.hero.intelligence,
  'Тип атаки': item.hero.combat
});

const Table = ({ data, amountRows = 10, usePagination = true }) => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [sortRules, setSortRules] = useState(emptySortRules);

  const rowsPerPage = Math.max(1, Number(amountRows) || 10);
  const tableHead = columns.map((column) => column.label);
  const sortFields = columns;

  const filterOptions = useMemo(() => ({
    roles: getUniqueValues(data.flatMap((hero) => hero.roles)),
    attributes: getUniqueValues(data.map((hero) => hero.attribute)),
    combatTypes: getUniqueValues(data.map((hero) => hero.combat))
  }), [data]);

  const filteredData = useMemo(() => {
    return data
      .map((hero, index) => ({ hero, index }))
      .filter(({ hero }) => (
        hero.name.toLowerCase().includes(filters.name.toLowerCase())
        && (filters.role === 'all' || hero.roles.includes(filters.role))
        && (filters.attribute === 'all' || hero.attribute === filters.attribute)
        && (filters.combat === 'all' || hero.combat === filters.combat)
        && isInRange(hero.strength, filters.strengthFrom, filters.strengthTo)
        && isInRange(hero.agility, filters.agilityFrom, filters.agilityTo)
        && isInRange(hero.intelligence, filters.intelligenceFrom, filters.intelligenceTo)
      ));
  }, [data, filters]);

  const sortedData = useMemo(() => {
    const activeRules = sortRules.filter((rule) => rule.field !== '');
    const result = [...filteredData];

    result.sort((first, second) => {
      for (const rule of activeRules) {
        const firstValue = getSortValue(first, rule.field);
        const secondValue = getSortValue(second, rule.field);
        const compare = compareValues(firstValue, secondValue);

        if (compare !== 0) {
          return rule.direction === 'asc' ? compare : -compare;
        }
      }
      return 0;
    });

    return result;
  }, [filteredData, sortRules]);

  useEffect(() => {
    setActivePage(1);
  }, [filters, sortRules]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));
  const startIndex = (activePage - 1) * rowsPerPage;
  const currentRows = usePagination
    ? sortedData.slice(startIndex, startIndex + rowsPerPage)
    : sortedData;

  const tableRows = currentRows.map(createTableRow);

  const resetFilters = () => setFilters(initialFilters);
  const resetSort = () => setSortRules(emptySortRules);

  return (
    <>
      <Filter
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        options={filterOptions}
      />
      <SortPanel fields={sortFields} sortRules={sortRules} setSortRules={setSortRules} resetSort={resetSort} />

      <table border="1" width="100%">
        <TableHead head={tableHead} />
        <TableBody body={tableRows} />
      </table>

      {usePagination && (
        <div className="pagination">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
            <span
              key={page}
              className={page === activePage ? 'page-number active' : 'page-number'}
              onClick={() => setActivePage(page)}
            >
              {page}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Table;

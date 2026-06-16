export const initialFilters = {
  name: '',
  role: 'all',
  attribute: 'all',
  combat: 'all',
  strengthFrom: '',
  strengthTo: '',
  agilityFrom: '',
  agilityTo: '',
  intelligenceFrom: '',
  intelligenceTo: ''
};

const Filter = ({ filters, setFilters, resetFilters, options = {} }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const roles = options.roles || [];
  const attributes = options.attributes || [];
  const combatTypes = options.combatTypes || [];

  return (
    <fieldset>
      <legend>Фильтры для поиска</legend>

      <label>
        Имя героя:
        <input name="name" type="text" value={filters.name} onChange={handleChange} />
      </label>
      <br />

      <label>
        Роль:
        <select name="role" value={filters.role} onChange={handleChange}>
          <option value="all">Все роли</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Главный атрибут:
        <select name="attribute" value={filters.attribute} onChange={handleChange}>
          <option value="all">Все атрибуты</option>
          {attributes.map((attribute) => (
            <option key={attribute} value={attribute}>{attribute}</option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Тип атаки:
        <select name="combat" value={filters.combat} onChange={handleChange}>
          <option value="all">Все типы атаки</option>
          {combatTypes.map((combat) => (
            <option key={combat} value={combat}>{combat}</option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Сила от:
        <input name="strengthFrom" type="number" value={filters.strengthFrom} onChange={handleChange} />
      </label>
      <br />

      <label>
        Сила до:
        <input name="strengthTo" type="number" value={filters.strengthTo} onChange={handleChange} />
      </label>
      <br />

      <label>
        Ловкость от:
        <input name="agilityFrom" type="number" value={filters.agilityFrom} onChange={handleChange} />
      </label>
      <br />

      <label>
        Ловкость до:
        <input name="agilityTo" type="number" value={filters.agilityTo} onChange={handleChange} />
      </label>
      <br />

      <label>
        Интеллект от:
        <input name="intelligenceFrom" type="number" value={filters.intelligenceFrom} onChange={handleChange} />
      </label>
      <br />

      <label>
        Интеллект до:
        <input name="intelligenceTo" type="number" value={filters.intelligenceTo} onChange={handleChange} />
      </label>
      <br />

      <input type="button" value="Очистить фильтр" onClick={resetFilters} />
    </fieldset>
  );
};

export default Filter;

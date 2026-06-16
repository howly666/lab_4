import './CSS/App.css';
import dogs from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">

      <Table data={dogs} amountRows="10" usePagination={true} />

      <footer>
        Капитонов Илья Александрович <br />
        Б9123-02.03.03тп(2)
      </footer>
    </div>
  );
}

export default App;

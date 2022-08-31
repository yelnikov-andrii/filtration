import { useEffect, useState } from 'react';
import { getData } from './api';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [query, setQuery] = useState('');
  useEffect( () => { 
    async function fetchData() {
        try {
            const res = await getData(); 
            setData(res.results);
        } catch (err) {
            console.log(err);
        }
    }
    fetchData();
}, []);

const filterData = (input) => {
  if (data !== undefined && data.length !== 0) {
    const filtered = [...data].filter((el) => el.title !== undefined && el.title.toLowerCase().includes(input.toLowerCase()));
    console.log(data)
    return filtered;
  }
}

const filteredData = filterData(query);
  return (
    <div className="App">
      <form>
        <input 
          onChange={(event) => {
            setQuery(event.target.value);
            filterData(query);
          }}/>
      </form>
      <ul>
      {filteredData !== undefined && filteredData.map(el => (
        <li
          key={el['@id']}>
          <a href={el.title || '/'}>
          {`${el.title || '-'}`}
          </a>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;

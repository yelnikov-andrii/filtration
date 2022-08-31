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
    };

    fetchData();
  }, []);

const filterData = (input) => {
  if (data !== undefined && data.length !== 0) {
    const filtered = [...data].filter((obj) => obj.title !== undefined && obj.title.toLowerCase().includes(input.toLowerCase()));
    return filtered;
  }
}

const filteredData = filterData(query);
  return (
    <div className="main">
      <div className='main__block'>
      <form className='main__form'>
        <label className='main__form-label'>filter by title</label>
        <input
          className='main__form-input'
          placeholder='title'
          onChange={(event) => {
            setQuery(event.target.value);
            filterData(query);
          }}/>
      </form>
      <ul className='main__list'>
      {filteredData !== undefined && filteredData.map(el => (
        <li
          className='main__list-item'
          key={el['@id']}
        > {`${el['@path']}/`}
        <a 
          className='main__link'
          href={`/${el.title}`}
        >
          {`${el.title}`}
        </a>
        </li>
      ))}
      </ul>
      </div>
    </div>
  );
}

export default App;

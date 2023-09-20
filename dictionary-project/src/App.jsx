import { useState } from 'react'
import './App.css'
import HandleApi from './HandleApi'

function App() {
  const [searchWord, setSearchWord] = useState('');

  return (
      <div className='startpage'>
        <header>
        <h1>Dictionary</h1>
        </header>

        <main>
          <input type="text" placeholder="Search for a word to get the definition" onChange={e => setSearchWord(e.target.value)} value={searchWord}/>
        <button type="submit" onClick={() => HandleApi(searchWord)}>Search</button>
        </main>
    </div>
  )
}

export default App

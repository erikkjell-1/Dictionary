import { useState } from 'react'
import './Index.css'

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [apiAnswerDef, setApiAnswerDef] = useState('');
  const [apiAnswerPho, setApiAnswerPho] = useState('');
  const [apiAnswerAudio, setApiAnswerAudio] = useState('');
  const [apiError, setApiError] = useState('');
  const [apiLoading, setApiLoading] = useState(false);

  async function HandleApi(searchWord) {
    
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
    const data = await response.json();
   
    if (data === null) {
      setApiError("No Definitions Found");
      setApiLoading(false);
      console.log(apiError);
    } else {
      setApiAnswerDef(data[0].meanings[0].definitions[0].definition);
      setApiAnswerPho(data[0].phonetics[0]);
      setApiAnswerAudio(data[0].phonetics[0].audio);
      setApiLoading(false);
    }
    
  }
  return (
      <div className='App'>
        <header>
        <h1>Dictionary</h1>
        </header>

        <main>
          <input type="text" placeholder="Search for a word to get the definition" onChange={e => setSearchWord(e.target.value)} value={searchWord}/>
        <button type="submit" onClick={() => HandleApi(searchWord)}>Search</button>
        </main>
        <section>
          <h2>{searchWord}</h2>
          {apiLoading ? <p>Loading...</p> : <p>{apiError}</p>}
      
          {apiLoading ? <p>Loading...</p> : <p>Definition: {apiAnswerDef}</p>}
          {apiLoading ? <p>Loading...</p> : <p>Phonetic: {apiAnswerPho.text}</p>}
          <audio controls test-id='audio' src={apiAnswerAudio}></audio>
        </section>
        
    </div>
  )
}
export default App;
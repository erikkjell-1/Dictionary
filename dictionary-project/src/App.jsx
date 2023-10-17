import { useState } from 'react'
import './Index.css'

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [apiAnswerDef, setApiAnswerDef] = useState('');
  const [apiAnswerPho, setApiAnswerPho] = useState('');
  const [apiAnswerAudio, setApiAnswerAudio] = useState('');
  const [apiAnswerMea, setApiAnswerMea] = useState('');
  const [apiAnswerDef2, setApiAnswerDef2] = useState('');
  const [apiAnswerMea2, setApiAnswerMea2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function HandleApi(searchWord) {
    if (searchWord > 0) {
      setMessage('Please enter a word to search');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
      if (!response.ok) {
        setMessage('No match found for the entered word');
      }
      const data = await response.json();
      
      setApiAnswerDef(data[0].meanings[0].definitions[0].definition);
      setApiAnswerPho(data[0].phonetics[0]);
      setApiAnswerAudio(data[0].phonetics[0].audio);
      setApiAnswerMea(data[0].meanings[0].partOfSpeech);
      setApiAnswerMea2(data[0].meanings[1].partOfSpeech);
      setApiAnswerDef2(data[0].meanings[0].definitions[1].definition);
      setMessage('');
    } finally {
      setIsLoading(false);
    }

  }
  return (
    <div className='App'>

      <div className='Dictionary'>
      <header>
        <h1>Dictionary</h1>
      </header>

      <main>
        <input type="text" placeholder="Search for a word to get the definition" onChange={e => setSearchWord(e.target.value)} value={searchWord} />
        <button type="submit" onClick={() => HandleApi(searchWord)}>Search</button>
      </main>
      
      {isLoading ? (
          <p>Loading...</p>
      ) : message ? (
          <p>{message}</p>
      ) : ( 
        <section>
        {<p>Phonetic: {apiAnswerPho.text}</p>}
        {<p>Part of Speech: {apiAnswerMea}</p>}
        {<p>Definition: {apiAnswerDef}</p>}
        {<p>Part of Speech: {apiAnswerMea2}</p>}
        {<p>Definition: {apiAnswerDef2}</p>}
        <audio controls test-id='audio' src={apiAnswerAudio}></audio>
      </section>
      )}

      
    </div>
    </div>
  )
}
export default App;
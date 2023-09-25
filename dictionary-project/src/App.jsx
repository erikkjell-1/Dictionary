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
  const [apiLoading, setApiLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function HandleApi(searchWord) {

    if (searchWord === '') {
      setMessage('Please enter a word');
      setApiLoading(true);
      return;
    }

    try {
      await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);

      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
      const data = await response.json();

      setApiAnswerDef(data[0].meanings[0].definitions[0].definition);
      setApiAnswerPho(data[0].phonetics[0]);
      setApiAnswerAudio(data[0].phonetics[0].audio);
      setApiAnswerMea(data[0].meanings[0].partOfSpeech);
      setApiAnswerMea2(data[0].meanings[1].partOfSpeech);
      setApiAnswerDef2(data[0].meanings[0].definitions[1].definition);
      setApiLoading(false);
    } catch (error) {
      throw new Error(error)
    }

  }
  return (
    <div className='App'>
      <header>
        <h1>Dictionary</h1>
      </header>

      <main>
        <input type="text" placeholder="Search for a word to get the definition" onChange={e => setSearchWord(e.target.value)} value={searchWord} />
        <button type="submit" onClick={() => HandleApi(searchWord)}>Search</button>
      </main>
      <section>
        <h2>{searchWord}</h2>
        <p>{message}</p>

        {apiLoading ? <p>Loading...</p> : <p>Phonetic: {apiAnswerPho.text}</p>}
        {apiLoading ? <p>Loading...</p> : <p>Part of Speech: {apiAnswerMea}</p>}
        {apiLoading ? <p>Loading...</p> : <p>Definition: {apiAnswerDef}</p>}
        {apiLoading ? <p>Loading...</p> : <p>Part of Speech: {apiAnswerMea2}</p>}
        {apiLoading ? <p>Loading...</p> : <p>Definition: {apiAnswerDef2}</p>}
        <audio controls test-id='audio' src={apiAnswerAudio}></audio>
      </section>

    </div>
  )
}
export default App;
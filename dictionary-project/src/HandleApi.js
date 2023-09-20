import { useState } from "react";

async function HandleApi(searchWord) {
const [apiAnswer, setApiAnswer] = useState('');

const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
const response = await fetch(url);
const data = await response.json();
console.log(data);
await setApiAnswer(data);
console.log(apiAnswer);
}

export default HandleApi;

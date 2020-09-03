import React, {useState} from 'react'

import Meta from './Meta';

import './main.scss';

export default function Main() {

  const [url, setUrl] = useState('https://');
  const [old, setOld] = useState('');
  const [link, setLink] = useState('link');
  const [meta, setMeta] = useState<Meta>({content: '', visible: false});


  const submit = () => {

    if (old === url) return;
      
    // eslint-disable-next-line
    let a = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g.exec(url);
    if (a === null) {
      return setMeta({ content: "invalid url!", visible: true });
    }

    let api = document.URL === "http://localhost:3000/"? "http://localhost:8787/": "https://api-production.shrtlu.workers.dev/"

    fetch(api + `?url=${url}`, {
      method: 'POST',
    }).then(res => {
      return res.json();
    }).then(data => {
      setOld(url);
      setLink(data.link);
    });
  }

	return (
    <div id='Main'>
      <h1>Shrt.lu</h1>

      <p className={`meta ${meta.visible? 'visible' : ''}`} style={meta.position? {transform: `translate(${meta.position.x}, ${meta.position.y})`}: {}}>{meta.content}</p> 
      
      <input autoFocus id='url' className='input' placeholder='Url' value={url} onChange={e => {
        setUrl(e.target.value); setMeta({ content: '', visible: false })
      }} onKeyPress={e => e.key === 'Enter' ? submit() : ''} />
      <button onClick={() => submit()}>Shorten!</button>

      <div className={`output ${link === 'link'? 'disabled': ''}`}>
        <p className='input'>{link}</p>
        <button disabled={link === 'link'} onClick={() => {
          navigator.clipboard.writeText(link);
          setMeta({ content: 'Copied!', visible: true, position: {x: '-50%', y: '150px'} });

          setTimeout(() => { setMeta({content: '', visible: false}) }, 1000);
        }}>copy</button>
      </div>

    </div>
  );
}

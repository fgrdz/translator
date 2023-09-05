import api from '../services/api';
import { useState, useEffect } from "react"
import './boxEntrada.css'
import axios from 'axios';

const BoxTraducao = () => {
  const [idiomas, setIdiomas] = useState([]);
  const [text, setText] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdSource, setSelectedIdSource] = useState('')
  const [traducao, setTraducao] = useState(null);

  useEffect(() => {
    async function getIdiomas() {
      try {
        const response = await api.get('/getLanguages');
        setIdiomas(response.data.data.languages);
      } catch (error) {
        console.error('Erro ao buscar idiomas:', error);
      }
    }
    getIdiomas();
  }, []);

  const handleSubmit = async (e)=> {
    e.preventDefault();

    if(text && selectedIdSource && selectedId){
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', selectedIdSource);
    encodedParams.set('target_language', selectedId);
    encodedParams.set('text', text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '3657c5946bmsh83e3c87da69c811p1752c5jsnedb9deb1b42e',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setTraducao(response.data.data);
    } catch (error) {
      console.error('Erro na tradução:', error);
    }
  }
  }

  function handleSelectChange(selectedId) {
    setSelectedId(selectedId);
  }
  function handleSelectChangeSource(selectedIdSource){
    setSelectedIdSource(selectedIdSource)

  }

  return (
    <div className='container-traducao'>
      <div className="container-entrada">
        <form onSubmit={handleSubmit}>
          <select onChange={(e) => handleSelectChangeSource(e.target.value)}>
            <option value="">Selecione um idioma</option>
            {Array.isArray(idiomas) &&
              idiomas.map((idioma) => (
                <option key={idioma.id} value={idioma.code}>
                  {idioma.name}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleSelectChange(e.target.value)}>
            <option value="">Traduzir para</option>
            {Array.isArray(idiomas) &&
              idiomas.map((idioma) => (
                <option key={idioma.id} value={idioma.code}>
                  {idioma.name}
                </option>
              ))}
          </select>
          <textarea rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="submit">Traduzir</button>
        </form>
      </div>
      <div className='saida'>
        {traducao && (         
        <textarea rows={10} value={traducao.translatedText}/>)}
      </div>
      
    </div>
  );
};

export default BoxTraducao;

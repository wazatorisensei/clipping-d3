import { useState } from 'react';
import './App.css';
import { BarChart } from './components/BarChart';
import { generateRandomData } from './utils/dataGenerator';

export const App = () => {
  const [data, setData] = useState(generateRandomData(20000));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <BarChart data={data} width={600} height={500} />
      <button onClick={() => setData(generateRandomData(20000))}>
        Gerar Dados
      </button>
    </div>
  );
};

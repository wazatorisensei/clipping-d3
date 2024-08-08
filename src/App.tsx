import { useState } from 'react';
import './App.css';
import { generateRandomData } from './utils/dataGenerator';
import { BarChart } from './components/BarChart';
import { PieChart } from './components/PieChart';

export const App = () => {
  const [data, setData] = useState(generateRandomData(100));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <PieChart data={data} width={500} height={500} />
      <BarChart data={data} width={500} height={500} />
      <button onClick={() => setData(generateRandomData(100))}>
        Gerar Dados
      </button>
    </div>
  );
};

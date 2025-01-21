import React from 'react';
import { CepResult } from '../types';

interface ResultCardProps {
  data: CepResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  return (
    <div className="border rounded-md p-4 shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Resultado da Busca</h2>
      <p>
        <strong>CEP:</strong> {data.data.cep}
      </p>
      <p>
        <strong>Estado:</strong> {data.data.state}
      </p>
      <p>
        <strong>Cidade:</strong> {data.data.city}
      </p>
      <p>
        <strong>Bairro:</strong> {data.data.neighborhood}
      </p>
      <p>
        <strong>Rua:</strong> {data.data.street}
      </p>
      <p>
        <strong>Serviço:</strong> {data.data.service}
      </p>
      {data.status === 2 && (
        <p>
          <strong>Mensagem:</strong> {data.message}
        </p>
      )}
    </div>
  );
};

export default ResultCard;

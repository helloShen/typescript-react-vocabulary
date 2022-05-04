import React from 'react';
import {Vocab} from './model';

export interface CardsProps {
  vocabs: Vocab[];
}

const Cards: React.FC<CardsProps> = ({vocabs}) => {
  return (
    <div className="cards">
      {
        vocabs.map((v: Vocab) => {
          return (
            <div
              key={v.id}
              className="card"
            >
              {v.word}
            </div>
          );
        })
      }
    </div>
  );
};

export default Cards;

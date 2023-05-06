import { useState } from 'react';

interface ICategoryProps {
    name: string;
}

export const Category = ({ name }: ICategoryProps) => {
    const [selected, setSelected] = useState(false);
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
        <span
            onClick={() => setSelected(!selected)}
            role={'button'}
            style={{
                margin: '5px 2rem 5px 0',
                padding: '0 5px',
                backgroundColor: selected ? '#7064E6' : '#fff',
                border: selected ? '1px solid #fff' : '1px solid #7064E6',
                borderRadius: '5px'
            }}
        >
            {name}
        </span>
    );
};

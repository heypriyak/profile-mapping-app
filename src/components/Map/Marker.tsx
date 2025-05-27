import React from 'react';

interface MarkerProps {
    position: {
        lat: number;
        lng: number;
    };
    title: string;
}

const Marker: React.FC<MarkerProps> = ({ position, title }) => {
    return (
        <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
            <h4>{title}</h4>
            <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'red',
                borderRadius: '50%',
                position: 'absolute',
                top: 0,
                left: 0,
            }} />
        </div>
    );
};

export default Marker;
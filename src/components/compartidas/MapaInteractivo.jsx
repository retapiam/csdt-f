import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const MapaInteractivo = ({ 
  center = [4.6097, -74.0817], // Bogotá por defecto
  zoom = 6,
  marcadores = [],
  altura = '400px',
  onMarcadorClick = null,
  mostrarControles = true
}) => {
  const [mapa, setMapa] = useState(null);

  // Componente para centrar el mapa cuando cambien las coordenadas
  const CentrarMapa = ({ center, zoom }) => {
    const map = useMap();
    
    useEffect(() => {
      if (center) {
        map.setView(center, zoom);
      }
    }, [center, zoom, map]);
    
    return null;
  };

  // Componente para manejar clics en el mapa
  const ManejadorClics = ({ onClic }) => {
    const map = useMap();
    
    useEffect(() => {
      if (onClic) {
        const handleClick = (e) => {
          onClic(e.latlng);
        };
        
        map.on('click', handleClick);
        return () => {
          map.off('click', handleClick);
        };
      }
    }, [map, onClic]);
    
    return null;
  };

  const handleMarcadorClick = (marcador) => {
    if (onMarcadorClick) {
      onMarcadorClick(marcador);
    }
  };

  return (
    <div className="w-full" style={{ height: altura }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMapa}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <CentrarMapa center={center} zoom={zoom} />
        <ManejadorClics onClic={onMarcadorClick} />
        
        {marcadores.map((marcador, index) => (
          <Marker
            key={index}
            position={[marcador.lat, marcador.lng]}
            eventHandlers={{
              click: () => handleMarcadorClick(marcador)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg">{marcador.titulo}</h3>
                <p className="text-sm text-gray-600">{marcador.descripcion}</p>
                {marcador.detalles && (
                  <div className="mt-2 text-xs">
                    {Object.entries(marcador.detalles).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapaInteractivo;

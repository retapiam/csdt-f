import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import { MAP_CONFIG, MAP_PROVIDERS, MAP_WMS, CRS_CONFIG } from '../../config/config';
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
  mostrarControles = true,
  capaBase = 'auto' // 'auto' | 'libre' | 'osm' | 'mapbox' | 'mapbox_sat' | 'esri' | 'yandex' | 'maxar' | 'custom' | 'wms' | 'carto_light' | 'carto_dark' | 'opentopo' | 'wikimedia'
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

  // Determinar si usar Mapbox o OSM según disponibilidad de token
  const usarMapbox = Boolean(MAP_CONFIG.MAPBOX_TOKEN);

  // Opciones de rendimiento
  const mapPerformanceProps = { preferCanvas: true };
  const tilePerformanceProps = { updateWhenIdle: true, keepBuffer: 2, crossOrigin: true };

  return (
    <div className="w-full" style={{ height: altura }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMapa}
        {...mapPerformanceProps}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer
            checked={capaBase === 'osm' || (capaBase === 'auto' && !usarMapbox)}
            name="OpenStreetMap"
          >
            <TileLayer
              attribution={MAP_CONFIG.OSM_ATTRIBUTION}
              url={MAP_CONFIG.OSM_TILE_URL}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer
            checked={capaBase === 'libre'}
            name="Libre (OSM)"
          >
            <TileLayer
              attribution={MAP_CONFIG.OSM_ATTRIBUTION}
              url={MAP_CONFIG.OSM_TILE_URL}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer
            checked={capaBase === 'mapbox' || (capaBase === 'auto' && usarMapbox)}
            name="Mapbox Streets"
          >
            <TileLayer
              attribution={MAP_CONFIG.ATTRIBUTION}
              url={MAP_CONFIG.TILE_URL(MAP_CONFIG.MAPBOX_TOKEN, MAP_CONFIG.MAPBOX_STYLE)}
              tileSize={MAP_CONFIG.TILE_SIZE}
              zoomOffset={MAP_CONFIG.ZOOM_OFFSET}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer
            checked={capaBase === 'mapbox_sat'}
            name="Mapbox Satellite"
          >
            <TileLayer
              attribution={MAP_PROVIDERS.MAPBOX_SATELLITE(MAP_CONFIG.MAPBOX_TOKEN).attribution}
              url={MAP_PROVIDERS.MAPBOX_SATELLITE(MAP_CONFIG.MAPBOX_TOKEN).url}
              tileSize={MAP_PROVIDERS.MAPBOX_SATELLITE(MAP_CONFIG.MAPBOX_TOKEN).tileSize}
              zoomOffset={MAP_PROVIDERS.MAPBOX_SATELLITE(MAP_CONFIG.MAPBOX_TOKEN).zoomOffset}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer
            checked={capaBase === 'esri'}
            name="Esri World Imagery"
          >
            <TileLayer
              attribution={MAP_PROVIDERS.ESRI_WORLD_IMAGERY.attribution}
              url={MAP_PROVIDERS.ESRI_WORLD_IMAGERY.url}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>

          {MAP_PROVIDERS.YANDEX.url && (
            <LayersControl.BaseLayer
              checked={capaBase === 'yandex'}
              name="Yandex"
            >
              <TileLayer
                attribution={MAP_PROVIDERS.YANDEX.attribution}
                url={MAP_PROVIDERS.YANDEX.url}
                {...tilePerformanceProps}
              />
            </LayersControl.BaseLayer>
          )}

          {MAP_PROVIDERS.MAXAR.url && (
            <LayersControl.BaseLayer
              checked={capaBase === 'maxar'}
              name="Maxar"
            >
              <TileLayer
                attribution={MAP_PROVIDERS.MAXAR.attribution}
                url={MAP_PROVIDERS.MAXAR.url}
                {...tilePerformanceProps}
              />
            </LayersControl.BaseLayer>
          )}

          {MAP_PROVIDERS.CUSTOM_XYZ.url && (
            <LayersControl.BaseLayer
              checked={capaBase === 'custom'}
              name="Custom XYZ"
            >
              <TileLayer
                attribution={MAP_PROVIDERS.CUSTOM_XYZ.attribution}
                url={MAP_PROVIDERS.CUSTOM_XYZ.url}
                {...tilePerformanceProps}
              />
            </LayersControl.BaseLayer>
          )}

          {MAP_WMS.URL && (
            <LayersControl.Overlay checked={capaBase === 'wms'} name="WMS">
              {/* Para WMS en react-leaflet, se recomienda leaflet.wms o usar WMTS con TileLayer. Simplificamos si es WMTS XYZ compatible */}
              <TileLayer
                attribution={MAP_WMS.ATTRIBUTION}
                url={`${MAP_WMS.URL}`}
                {...tilePerformanceProps}
              />
            </LayersControl.Overlay>
          )}

          <LayersControl.BaseLayer checked={capaBase === 'carto_light'} name="Carto Positron">
            <TileLayer
              attribution={MAP_PROVIDERS.CARTO_POSITRON.attribution}
              url={MAP_PROVIDERS.CARTO_POSITRON.url}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked={capaBase === 'carto_dark'} name="Carto Dark Matter">
            <TileLayer
              attribution={MAP_PROVIDERS.CARTO_DARK_MATTER.attribution}
              url={MAP_PROVIDERS.CARTO_DARK_MATTER.url}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked={capaBase === 'opentopo'} name="OpenTopoMap">
            <TileLayer
              attribution={MAP_PROVIDERS.OPENTOPOMAP.attribution}
              url={MAP_PROVIDERS.OPENTOPOMAP.url}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked={capaBase === 'wikimedia'} name="Wikimedia OSM">
            <TileLayer
              attribution={MAP_PROVIDERS.WIKIMEDIA.attribution}
              url={MAP_PROVIDERS.WIKIMEDIA.url}
              {...tilePerformanceProps}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        
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

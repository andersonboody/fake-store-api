import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import classes from './Maps.module.scss'
import { useGetLocationsQuery } from '../../shared/services/api/endpoints/locations/locations'
import Loading from '../../shared/ui/spin/Spin'

interface IMaps {
  getShop: (shopName: string) => void
}

export const Maps = ({ getShop }: IMaps) => {
  const { data, isFetching } = useGetLocationsQuery()

  const markerShop = data?.map((shop) => (
    <Marker
      position={[shop.latitude, shop.longitude]}
      key={shop.id}
      eventHandlers={{ click: () => getShop(shop.name) }}
    >
      <Popup>{shop.name}</Popup>
    </Marker>
  ))

  return (
    <>
      {isFetching && (
        <div className={classes.mapsLoading}>
          <Loading />
        </div>
      )}
      <MapContainer center={[4.75, -74.34]} zoom={11} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerShop}
      </MapContainer>
    </>
  )
}

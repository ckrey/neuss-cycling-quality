import { useStore } from '@nanostores/react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as pmtiles from 'pmtiles'
import { useEffect, useState } from 'react'
import {Layer, Map, Source, type ViewStateChangeEvent} from 'react-map-gl/maplibre'
import {
  $clickedMapData,
  $mapLoaded,
  $searchParams,
  type MapSearchParam,
  type SearchParamBaseMap,
} from './store'
import { roundPositionForURL } from './utils/roundNumber'

type Props = {
  initialViewState: MapSearchParam
  interactiveLayerIds: string[]
  boxZoom?: boolean
  children: React.ReactNode
}

export const BaseMap = ({ initialViewState, interactiveLayerIds, boxZoom, children }: Props) => {
  useEffect(() => {
    const protocol = new pmtiles.Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

  const params = useStore($searchParams) as SearchParamBaseMap

  const [cursorStyle, setCursorStyle] = useState('grab')

  const setParamsMap = ({ latitude, longitude, zoom }: MapSearchParam) => {
    const mapParamsRounded = roundPositionForURL({ latitude, longitude, zoom })
    // const mapParamString = paramMapStringify(mapParamsRounded)
    const replaceHistory = true
      $searchParams.open({
          ...params,
          zoom: mapParamsRounded.zoom,
          lat: mapParamsRounded.latitude,
          lon: mapParamsRounded.longitude
      }, replaceHistory)
  }

  // Update ?map on zoom or pan of map
  const handleMoveEnd = (event: ViewStateChangeEvent) => {
    const { latitude, longitude, zoom } = event.viewState
    setParamsMap({ latitude, longitude, zoom })
  }

  // Set ?map to `initialViewState` if no `map` present, yet
  useEffect(() => {
    if (params.zoom && params.lat && params.lon) return
    setParamsMap(initialViewState)
  }, [])

  const latLngZoom = params

  const rasterAttribution='Daten © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</code>-Mitwirkende (<a href="https://opendatacommons.org/licenses/odbl/index.html">ODbL</a>), <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="https://openstreetmap.org/fixthemap">mitmachen/Fehler melden</a>'

  return (
    <Map
      initialViewState={{
        ...initialViewState,
        zoom: Number(latLngZoom.zoom) || initialViewState.zoom,
        latitude: Number(latLngZoom.lat) || initialViewState.latitude,
        longitude: Number(latLngZoom.lon) || initialViewState.longitude,
      }}
      // Style: https://cloud.maptiler.com/maps/dataviz/
      // mapStyle="https://api.maptiler.com/maps/dataviz/style.json?key=0opClOQz7xpg46NzNSOo"
      style={{ width: '100%', height: '100%' }}
      boxZoom={boxZoom || true}
      // hash
      // Set map state for <MapData>:
      onLoad={() => $mapLoaded.set(true)}
      // MapLocation
      onMoveEnd={handleMoveEnd}
      // Handle cursor and click:
      interactiveLayerIds={interactiveLayerIds}
      cursor={cursorStyle}
      onMouseEnter={() => setCursorStyle('pointer')}
      onMouseLeave={() => setCursorStyle('grab')}
      onClick={(event) => $clickedMapData.set(event.features)}
    >
      <Source
          type="raster"
          tiles={['https://tile.openstreetmap.de/{z}/{x}/{y}.png']}
          tileSize={512}
          attribution={rasterAttribution}
      >
        <Layer type="raster"></Layer>

      </Source>

      {children}
    </Map>
  )
}

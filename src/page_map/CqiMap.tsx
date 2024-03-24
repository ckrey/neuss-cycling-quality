import { $searchParams, type MapSearchParam } from '../BaseMap/store'
import { useStore } from '@nanostores/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { MapInspector } from './MapInspector'
import { MapSourceCqi } from './MapSourceCqi'
import { validAnzeigeValues, type SearchParamsCqiMap } from './storeCqi'
import { interactiveLayerIdsByGroup } from './layers/layers'
import { Overlay } from './Overlay'
import {BaseMap} from "../BaseMap/BaseMap.tsx";

type Props = {
  maxBounds: MapSearchParam['maxBounds']
  minZoom: MapSearchParam['minZoom']
  maxZoom?: MapSearchParam['maxZoom']
}

export const CqiMap = ({ maxBounds, minZoom, maxZoom }: Props) => {
  const params = useStore($searchParams) as SearchParamsCqiMap

  // Guard against invalid "anzeige" param values
  if (!validAnzeigeValues.includes(params.anzeige)) {
    $searchParams.open({ ...params, ...{ anzeige: 'cqi' } })
  }

  return (
    <BaseMap
      initialViewState={{
        longitude: 16.18278,
        latitude: 48.11833,
        zoom: 12,
        // Only pass the props if they are implicitly present
        // Needed to get rid of Astro's strict TS settings https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes
        ...(maxBounds ? { maxBounds } : {}),
        ...(minZoom ? { minZoom } : {}),
        ...(maxZoom ? { maxZoom } : {}),
      }}
      interactiveLayerIds={interactiveLayerIdsByGroup[params?.anzeige] || []}
    >
      <MapSourceCqi />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      <Overlay />
    </BaseMap>
  )
}

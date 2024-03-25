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
import {MapInfo} from "./MapInfo.tsx";

type Props = {
  maxBounds: MapSearchParam['maxBounds']
  minZoom: MapSearchParam['minZoom']
  maxZoom?: MapSearchParam['maxZoom']
}

export const CqiMap = ({ maxBounds, minZoom, maxZoom }: Props) => {
  const params = useStore($searchParams) as SearchParamsCqiMap

  // Guard against invalid "anzeige" param values
  if (!validAnzeigeValues.includes(params.mode)) {
    $searchParams.open({ ...params, ...{ mode: 'cqi' } })
  }

  return (
    <BaseMap
      initialViewState={{

        longitude: 6.688,
        latitude: 51.172,
        zoom: 11.5,
        // Only pass the props if they are implicitly present
        // Needed to get rid of Astro's strict TS settings https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes
        ...(maxBounds ? { maxBounds } : {}),
        ...(minZoom ? { minZoom } : {}),
        ...(maxZoom ? { maxZoom } : {}),
      }}
      interactiveLayerIds={interactiveLayerIdsByGroup[params?.mode] || []}
    >
      <MapSourceCqi />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      <MapInfo />
      <Overlay />
    </BaseMap>
  )
}

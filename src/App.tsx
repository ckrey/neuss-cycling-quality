import * as turf from '@turf/turf'
import type {LngLatBoundsLike} from 'react-map-gl/maplibre'
import {CqiMap} from "./page_map/CqiMap.tsx";

function App() {

    const berlinInnenstadtBbox = [13.08, 52.336, 13.76, 52.676] satisfies ReturnType<typeof turf.bbox>
    const maxBounds = turf.bbox(
        turf.buffer(turf.bboxPolygon(berlinInnenstadtBbox), 250, {
            units: 'meters',
        }),
    ) as LngLatBoundsLike

    const minZoom = 10

    return (
        <>
            <CqiMap client:load maxBounds={maxBounds} minZoom={minZoom}/>
            <div className="absolute bottom-3 left-3 rounded bg-white/80 px-1 py-0.5 text-xs">
                Datenstand: 02.03.2024
            </div>

        </>
    )
}

export default App

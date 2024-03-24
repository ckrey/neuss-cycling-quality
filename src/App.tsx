import type {LngLatBoundsLike} from 'react-map-gl/maplibre'
import {CqiMap} from "./page_map/CqiMap.tsx";
import "./base.css"

function App() {

    const viennabbox = [16.18278, 48.11833, 16.58, 48.32306] as LngLatBoundsLike
    // const maxBounds = bbox(
    //     buffer(bboxPolygon(berlinInnenstadtBbox), 250, {
    //         units: 'meters',
    //     }),
    // ) as LngLatBoundsLike
    // console.log(maxBounds)
    const minZoom = 10

    return (
        <>
            <CqiMap maxBounds={viennabbox} minZoom={minZoom}/>
            <div className="absolute bottom-3 left-3 rounded bg-white/80 px-1 py-0.5 text-xs">
                Datenstand: 24.03.2024
            </div>

        </>
    )
}

export default App

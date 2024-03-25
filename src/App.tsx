import type {LngLatBoundsLike} from 'react-map-gl/maplibre'
import {CqiMap} from "./page_map/CqiMap.tsx";
import "./base.css"

function App() {

    let neussbbox = [6.562976, 51.117101, 6.810168 , 51.278454]
    // const maxBounds = bbox(
    //     buffer(bboxPolygon(berlinInnenstadtBbox), 250, {
    //         units: 'meters',
    //     }),
    // ) as LngLatBoundsLike
    // console.log(maxBounds)
    neussbbox[0]*=0.99
    neussbbox[1]*=0.999
    neussbbox[2]*=1.01
    neussbbox[3]*=1.001

    const minZoom = 10

    return (
        <>
            <CqiMap maxBounds={neussbbox as LngLatBoundsLike} minZoom={minZoom}/>
            <div className="absolute bottom-3 left-3 rounded bg-white/80 px-1 py-0.5 text-xs">
                Datenstand: 24.03.2024
            </div>

        </>
    )
}

export default App

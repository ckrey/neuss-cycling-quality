import {useState} from "react";

export const MapInfo = () => {
    // const clickedMapData = useStore($clickedMapData)
    //
    // if (!clickedMapData || !clickedMapData.length) return null
    const [displayed, setDisplayed] = useState(true);
    return (
        <div id="overlay" style={{
            top: 0,
            bottom: 0,
            width: "100%",
            position: "absolute",
            display: displayed ? "flex" : "none",
            justifyContent: "center",
            // pointerEvents: "none",
            alignItems: "center",
            zIndex: 2000
        }} onClick={() => setDisplayed(false)}>
            <section
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="text-base z-50 overflow-y-auto rounded-lg bg-white border border-emerald-200 p-4 shadow-xl sm:inset-x-auto sm:inset-y-10 sm:right-5 sm:w-1/2">
                <h1 className="text-center">Cycling Quality Index<br/>Neuss</h1>
                <p>
                    Ein Radverkehrs-Qualitätsindex für Neuss basierend auf
                    <a href="https://www.openstreetmap.org/" target="_blank"> OSM</a>-Daten.
                </p>
                <p>Der Code für die Analyse und Visualisierung stammt vom
                    <a href="https://www.osm-verkehrswende.org/cqi/" target="_blank"> www.osm-verkehrswende.org</a>-Team
                    sowie vereinfacht von <a href="https://github.com/Findus23/vienna-cycling-quality" target="_blank"> Findus23 </a>
                    und wurde von mir nur
                    <a href="https://github.com/ckrey/neuss-cycling-quality" target="_blank"> für Neuss adaptiert</a>.
                    Weitere Informationen zur Methodik findet man auch auf der
                    <a href="https://www.osm-verkehrswende.org/cqi/" target="_blank"> osm-verkehrswende-Webseite </a>
                    oder im <a
                        href="https://www.osm-verkehrswende.org/cqi/posts/2024-01-01-cqi-fossgis-2024/"> FOSSGIS-Vortrag </a>
                    von Alex Seidel.
                </p>
                <p>
                    Alle Ergebnisse sind nur so gut wie die Rohdaten und fehlende Attribute (z.B. über Fahrbahnbreiten)
                    können die Ergebnisse verfälschen.
                    <a href="https://www.osm-verkehrswende.org/cqi/improve-data/"> Hier </a>
                    gibt es Informationen, wie man zu den Daten beitragen kann.
                </p>
                <p>
                    Über mich: <a href="https://ckrey.de">ckrey.de</a>
                </p>
            </section>
        </div>
    )
}

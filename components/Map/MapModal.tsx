"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression, Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

interface MapModalProps {
  destination?: string; // Restaurant address (optional, fallback to default)
  onClose: () => void; // Close modal function
}

const MapModal = ({ destination = "Christian Basti, Guwahati", onClose }: MapModalProps) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const vehicleMarkerRef = useRef<LeafletMarker<any> | null>(null);
  const routingRef = useRef<any>(null);
  const [L, setL] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Loader state

  // --------------------------------------
  // 1️⃣ Load Leaflet & Routing Machine
  // --------------------------------------
  useEffect(() => {
    const loadLeaflet = async () => {
      let leaflet = (window as any).L;
      if (!leaflet) {
        leaflet = (await import("leaflet")).default;

        // Fix default marker icon
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: "/leaflet/marker-icon-2x.png",
          iconUrl: "/leaflet/marker-icon.png",
          shadowUrl: "/leaflet/marker-shadow.png",
        });

        (window as any).L = leaflet;
      }

      if (!(window as any).L.Routing) {
        await import("leaflet-routing-machine");
      }

      setL(leaflet);
    };

    loadLeaflet();
  }, []);

  // --------------------------------------
  // 2️⃣ Initialize map, routing, and markers
  // --------------------------------------
  useEffect(() => {
    if (!L) return;

    const map = mapRef.current ?? L.map("map", { zoomControl: true });
    if (!mapRef.current) mapRef.current = map;

    // Set OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // -----------------------------
    // Default user location for Assam
    // -----------------------------
    const defaultUserLocation: LatLngExpression = [26.1670, 91.7682];  // Paltan Bazar, Guwahati
    const destCoords: LatLngExpression = [26.182, 91.745]; ; // Christian Basti, Guwahati

    // Place markers
    const startMarker = L.marker(defaultUserLocation).addTo(map).bindPopup("You are here").openPopup();
    const endMarker = L.marker(destCoords).addTo(map).bindPopup(destination);

    // Set map view to Assam
    map.setView(defaultUserLocation, 16);

    // Remove previous routing control if exists
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    // -----------------------------
    // Create routing
    // -----------------------------
    const routingControl = (window.L as any).Routing.control({
      waypoints: [(window.L as any).latLng(defaultUserLocation), (window.L as any).latLng(destCoords)],
      router: (window.L as any).Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      routeWhileDragging: false,
      addWaypoints: false,
      showAlternatives: false,
      createInstructionList: () => null,
      lineOptions: { styles: [{ color: "blue", weight: 5, opacity: 0.8 }] },
    }).addTo(map);

    routingRef.current = routingControl;

    // -----------------------------
    // Animate vehicle
    // -----------------------------
    routingControl.on("routesfound", (e: any) => {
      const coords: L.LatLngExpression[] = e.routes[0].coordinates;
      map.fitBounds(L.latLngBounds(coords), { padding: [50, 50] });

      if (vehicleMarkerRef.current) map.removeLayer(vehicleMarkerRef.current);
      vehicleMarkerRef.current = L.marker(coords[0], {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/171/171239.png",
          iconSize: [40, 40],
        }),
      }).addTo(map);

      let index = 0;
      const moveVehicle = () => {
        if (!vehicleMarkerRef.current || index >= coords.length) return;
        vehicleMarkerRef.current.setLatLng(coords[index]);
        index++;
        setTimeout(moveVehicle, 200);
      };
      moveVehicle();
    });

    setLoading(false); // Stop loader after map is ready
  }, [L, destination]);

  // --------------------------------------
  // 3️⃣ Modal UI with loader
  // --------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-2">
      <div className="bg-white w-full md:w-4/5 lg:w-3/4 xl:w-2/3 h-[90vh] rounded-2xl shadow-xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full z-[50]"
        >
          ✕ Close
        </button>

        {/* Loader */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-40">
            <p className="text-lg font-semibold">Loading map...</p>
          </div>
        )}

        <div id="map" className="w-full h-full z-10"></div>
      </div>
    </div>
  );
};

export default MapModal;

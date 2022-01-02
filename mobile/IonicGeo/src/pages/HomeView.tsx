import React from 'react';
import GoogleMapReact from 'google-map-react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSpinner} from '@ionic/react';

import {MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const AnyReactComponent = () => (
    <div style={{
        color: 'white', background: 'red', padding: '10px', display: 'inline-flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', transform: 'translate(-80%, -100%)'
    }}>
        <div className="pointer">
        </div>
    </div>
);
const HomeView = (props: any) => {
    const { center } = props

    let element = <><>
        <IonPage id='main'>
            <IonHeader>s
                <IonToolbar color='dark'>
                    <IonButtons slot='start'>
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle slot="start">Map Geolocation</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="GEoMap">
                    <MapContainer center={center}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker position={center}>
                            <Popup>Какой то крутой текст!!!</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </IonContent>
        </IonPage>
    </>
    </>;

}
export default HomeView
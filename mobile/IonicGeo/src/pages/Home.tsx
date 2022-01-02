import { IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar} from '@ionic/react';

import './Home.css';
import React from "react";

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [{ src: 'C:\\Users\\LENOVO\\Desktop\\photo-1491147334573-44cbb4602074.jpg', text: 'App LOGO' }];

const Home: React.FC = () => {
    return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen class="screen">
          <IonLabel class="welcome">Welcome!</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Home;

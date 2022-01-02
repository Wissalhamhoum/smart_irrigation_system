import { Redirect, Route } from 'react-router-dom';
import {IonApp, IonInput, IonItem, IonLabel, IonRouterOutlet} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import HomeView from './pages/HomeView';
import HomeContainer from './pages/HomeContainer';
import LocateParcel from './pages/LocateParcel';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';




const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route  path="/" component={Home}/>
          <Route  path="/Login" component={Login}/>
          <Route  path="/Pages/Login" component={Login}/>
          <Route  path="/Register" component={Register}/>
          <Route  path="/Pages/Register" component={Register}/>
          <Route  path="/Pages/HomeView" component={HomeView}/>
          <Route  path="/Pages/HomeContainer" component={HomeContainer}/>
          <Route  path="/Pages/LocateParcel"/>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {Link } from 'react-router-dom';
import { IonButton, IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import "./logstyle.css"
// import { History } from "history";
// import {Redirect} from "react-router";
//

export const Login: React.FC = () => {

    const [UserName, setUserName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<number>();

    function loginUser(){

        console.log(UserName , password);
        //history.push("/HomeView");
        //Redirect to='/HomeView' from='/Login'/
        // const hist=useHistory();
        // hist.push("/HomeView");


    }

    return (
        <IonApp>
            <IonHeader>
                <IonToolbar color="success">
                    <IonTitle class="title">Sign In</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput onIonChange={(e: any) => setUserName(e.target.value)} id="username" />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput onIonChange={(e: any) => setPassword(e.target.value)} id="password" type="password"/>
                </IonItem>
                <IonButton expand="block" onClick={loginUser}   color="success">Sign In</IonButton>
                <p>New here? <Link  to="/Pages/Register">Register</Link></p>
            </IonContent>
        </IonApp>);
};

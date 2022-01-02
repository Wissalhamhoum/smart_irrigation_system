import React, { useState } from 'react';
import {Link} from 'react-router-dom';
//import httpClient from 'react-http-client';
import { IonButton, IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import "./logstyle.css"
import Axios from 'axios'

    //const api = Axios.create({
        //baseURL : 'http://192.168.33.1:3333/api/Indexes'
    //})

export const Register: React.FC = () => {

    const [Name, setName]   = useState<string>();
    const [UserName, setUserName]   = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<number>();
    const [Cpassword, setCPassword] = useState<number>();

    function registerUser(){

        console.log(Name , UserName, email , password, Cpassword);
        Axios.post('/Register' , {name: Name , email : email }).then(function (response) {
            console.log('SEND');
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <IonApp>
            <IonHeader>
                <IonToolbar color="success">
                    <IonTitle class="title" >Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="content">
                <IonItem>
                    <IonLabel class="name" color="#ECF0F5" position="floating">Name</IonLabel>
                    <IonInput onIonChange={(e: any) => setName(e.target.value)} id="name" />
                </IonItem>
                <IonItem>
                    <IonLabel class="user" color="#ECF0F5" position="floating">Username</IonLabel>
                    <IonInput onIonChange={(e: any) => setUserName(e.target.value)} id="username" />
                </IonItem>
                <IonItem>
                    <IonLabel color="#ECF0F5" position="floating">Email</IonLabel>
                    <IonInput onIonChange={(e: any) => setEmail(e.target.value)} id="email" type="email"/>
                </IonItem>
                <IonItem>
                    <IonLabel color="#ECF0F5" position="floating">Password</IonLabel>
                    <IonInput onIonChange={(e: any) => setPassword(e.target.value)} id="password" type="password"/>
                </IonItem>
                <IonItem>
                    <IonLabel color="#ECF0F5" position="floating">Confirm Password</IonLabel>
                    <IonInput onIonChange={(e: any) => setCPassword(e.target.value)} id="Cpassword" type="password"/>
                </IonItem>
                <p>


                </p>
                <IonButton expand="block" class="button" color="success"  onClick={registerUser} >Sign Up</IonButton>
                <p color="success">Already have an account? <Link  to="/Pages/Login">Login</Link></p>
            </IonContent>
        </IonApp>);
};

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import axios from "axios";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle, waterOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { urlBase } from "../config/config.json"

function validateEmail(email: string) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}
const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [key, setKey] = useState("")
  const handleLogin = () => {
    if (!email) {
      setMessage("El email es requerido");
      setIserror(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage("Ingrse un email válido");
      setIserror(true);
      return;
    }

    if (!password || password.length < 4) {
      setMessage("La contraseña es requerida");
      setIserror(true);
      return;
    }

    const loginData = {
      "email": email,
      "password": password
    }

    const api = axios.create({
      baseURL: urlBase,
    })
    api.post("api/auth/login/", loginData)
      .then(res => {
        setKey(res.data.key);
        if (res.data.key) {
          axios.create({
            baseURL: urlBase,
            headers: {
              "Authorization": `Token ${res.data.key}`
            }
          })
            .get("asignados/me/")
            .then(resp => {
              if (resp.data.length > 0) {
                const dia = new Date().getDate()
                console.log(dia,resp.data[0].dia_del_mes);
                
                if(dia !== resp.data[0].dia_del_mes){
                  history.push("/info/", { data: resp.data[0] })
                } else {
                  window.localStorage.setItem("token", res.data.key)
                  history.push("/tab1/");
                }
              }else{
                setMessage("Ha ocurrido un error, intente más tarde")
              }
            })
        }
      })
      .catch(error => {
        console.log(error);

        setMessage("Ha ocurrido un error, vuelva a inte");
        setIserror(true)
      })
  };
  const token = window.localStorage.getItem("token")
  if (token) {
    history.push("/tab1/")
  }
  return (
    <IonPage>

      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon
                color='primary'
                style={{ fontSize: "120px", }}
                icon={waterOutline}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <h1>Bienvenido a JAAP</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <h3>Iniciar Sesión</h3>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                >
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                >
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
              {/* <p style={{ fontSize: "small" }}>
                  By clicking LOGIN you agree to our <a href="#">Policy</a>
              </p>
              <p style={{ fontSize: "medium" }}>
                  Don't have an account? <a href="#">Sign up!</a>
              </p> */}

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
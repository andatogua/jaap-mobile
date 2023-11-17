import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItemDivider, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';

const Tab3: React.FC = () => {
  const history = useHistory();
  const [users, setUsers] = useState<Array<any>>([]);
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    const api = axios.create({
      baseURL: `https://andruid.pythonanywhere.com/api/autenticacion`,
      headers: {
        "Authorization": `Token ${token}`
      }
    })
    api.get("/me/")
      .then(res => {
        console.log(res.data);

        setUsers(res.data)
      })
      .catch(error => {
        console.log("Error fetching data")
      })
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dasboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              {/* <h4>Welcome: {match.params.id}</h4> */}
              <IonItemDivider></IonItemDivider>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Datos del Usuario</IonCardTitle>
                  <IonCardSubtitle>Información del empleado</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  <p>ID: {users.id}</p>
                  <p>Nombre: {users.primer_nombre} {users.segundo_nombre ? users.segundo_nombre : ''}</p>
                  <p>Apellidos: {users.primer_apellido} {users.segundo_apellido ? users.segundo_apellido : ''}</p>
                  <p>Correo Electrónico: {users.email}</p>
                  <p>Teléfono: {users.telefono}</p>
                  <p>Dirección: {users.direccion}</p>
                  <p>¿Es Staff?: {users.is_staff ? 'Sí' : 'No'}</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

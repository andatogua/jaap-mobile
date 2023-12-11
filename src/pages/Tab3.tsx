import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItemDivider, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonIcon, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { personCircle } from 'ionicons/icons';

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

  const handleLogout = () => {
    // Eliminar el token del localStorage o cualquier otra lógica de cierre de sesión
    localStorage.removeItem('token'); // Reemplaza 'tuToken' con el nombre real de tu token
    // Redireccionar a la página de inicio de sesión o a donde desees
    window.location.href = '/'; // Reemplaza '/login' con tu ruta de inicio de sesión
  };
  return (
    <IonPage>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Datos del Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol className='ion-text-center'>
              <IonIcon
                style={{ fontSize: "120px", color: "#3880ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonList>

            <IonItem>
              <IonLabel>Nombre:</IonLabel>
              {`${users.primer_nombre} ${users.segundo_nombre ? users.segundo_nombre : ''}`}
            </IonItem>
            <IonItem>
              <IonLabel>Apellidos:</IonLabel>
              {`${users.primer_apellido} ${users.segundo_apellido ? users.segundo_apellido : ''}`}
            </IonItem>
            <IonItem>
              <IonLabel>Correo Electrónico:</IonLabel>
              {users.email}
            </IonItem>
            <IonItem>
              <IonLabel>Teléfono:</IonLabel>
              {users.telefono}
            </IonItem>
            <IonItem>
              <IonLabel>Dirección:</IonLabel>
              {users.direccion}
            </IonItem>

          </IonList>
        </IonGrid>
        <IonRow className='ion-justify-content-center ion-margin-top' >
          <IonButton color="danger" fill='outline' onClick={handleLogout}>
            Cerrar Sesión
          </IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

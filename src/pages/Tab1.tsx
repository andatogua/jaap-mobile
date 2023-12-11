import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { alertCircleOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const history = useHistory()
  const [abonados, setAbonados] = useState([])
  const [token, setToken] = useState(window.localStorage.getItem("token"))
  if (!token) {
    history.replace("/")
  }
  
  return (
    <IonPage>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={alertCircleOutline} size='large'></IonIcon>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>No existen lecturas registradas</IonCardContent>
        </IonCard>
        <IonRow class='ion-justify-content-center'>
        <IonButton onClick={()=>history.push("/tab2")}>Registrar Lectura de Servicio</IonButton>
        </IonRow>
      </IonContent>

    </IonPage>
  );
};

export default Tab1;

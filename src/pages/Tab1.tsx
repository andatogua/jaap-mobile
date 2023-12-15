import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { alertCircleOutline, personCircle } from 'ionicons/icons';
import { urlBase } from "../config/config.json"

const Tab1: React.FC = () => {
  const history = useHistory()
  const [abonados, setAbonados] = useState([])
  const [token, setToken] = useState(window.localStorage.getItem("token"))
  if (!token) {
    history.replace("/")
  }
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    const api = axios.create({
      baseURL: urlBase,
      headers: {
        "Authorization": `Token ${token}`
      }
    })
    api.get("api/lecturas/listardia/")
      .then(res => {
        setAbonados(res.data);
      })
      .catch(error => {
        console.log("Error fetching data")
      })
  }, [])


  return (
    <IonPage>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
          abonados.length > 0 ?
            <>
              {
                abonados.map((a) => {
                  let fecha = new Date(a.fecha)
                  return <IonCard>
                    <IonCardHeader>
                      <IonCardTitle style={{ display : "flex", gap: 16}} className='ion-align-items-center'>
                        <IonIcon icon={personCircle} size='large'></IonIcon>
                        {a.abonado.primer_nombre} {a.abonado.primer_apellido}
                      </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>Fecha de Registro: {fecha.toLocaleDateString()}</IonCardContent>
                  </IonCard>
                })
              }
            </>
            :
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={alertCircleOutline} size='large'></IonIcon>
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>No existen lecturas registradas</IonCardContent>
            </IonCard>
        }
        <IonRow class='ion-justify-content-center'>
          <IonButton onClick={() => history.push("/tab2")}>Registrar Lectura de Servicio</IonButton>
        </IonRow>
      </IonContent>

    </IonPage>
  );
};

export default Tab1;

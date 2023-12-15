import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { alertCircleOutline } from 'ionicons/icons';
import { urlBase } from "../config/config.json"
import { Geolocation } from '@ionic-native/geolocation/ngx';

const Tab2: React.FC = () => {
  const history = useHistory()
  const [abonados, setAbonados] = useState([])
  const [user, setUser] = useState();
  const [token, setToken] = useState(window.localStorage.getItem("token"))
  const [encontrados, setEncontrados] = useState([])
  const [seleccionado, setSeleccionado] = useState(Object)
  const [form, setForm] = useState(Object)
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  if (!token) {
    history.replace("/")
  }
  const api = axios.create({
    baseURL: urlBase,
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  const obtenerAbonados = () => {
    api.get("api/autenticacion/abonados/")
      .then(res => {
        console.log(res.data);
        setAbonados(res.data)
      })
      .catch(error => {
        console.log(error);
      })
    api.get("api/autenticacion/me/")
      .then(res => {
        console.log(res.data);

        setUser(res.data)
      })
      .catch(error => {
        console.log("Error fetching data")
      })
  }
  useEffect(() => {
    obtenerAbonados()
  }, [])

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  /*useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = response.coords;
        console.log(latitude,longitude);
        
        setLocation({ latitude, longitude });
      } catch (error) {
        console.error('Error obteniendo la ubicación', error);
      }
    };

    getLocation();
  }, [])*/

  const buscarElementos = (texto: String) => {
    const b = abonados.filter((a: any) => (
      a.username.includes(texto)
    ))
    setEncontrados(b)
  }

  const seleccionar = (e: any) => {
    setSeleccionado(e);
    setForm({
      ...form,
      abonado: e.id,
      empleado: user.id
    })
    setEncontrados([])
  }

  const guardarLectura = () => {
    api.post("api/lecturas/crear/", {
      "lectura_actual": form.lectura_actual,
      "abonado": form.abonado,
      "empleado": form.empleado
    })
      .then(res => {
        console.log(res);

        const { status } = res
        if (status === 201) {
          setIserror(true)
          setMessage("Lectura guardada correctamente")
        }
        else {
          setIserror(true)
          setMessage("Ha ocurrido un error")
        }
      })
      .catch(e => {
        console.log(e)
        setIserror(true)
        setMessage("Intente más tarde")
      })

  }

  return (
    <IonPage>

      <IonContent fullscreen>
        <IonAlert
          isOpen={iserror}
          onDidDismiss={() => setIserror(false)}
          cssClass="my-custom-class"
          header={"Atención!"}
          message={message}
          buttons={["Dismiss"]}
        />
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nuevo Registro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonSearchbar debounce={600} showClearButton="always"
            onIonInput={(e: any) => buscarElementos(e.detail.value)}
          ></IonSearchbar>
        </IonCard>
        {
          encontrados.length > 0 && <IonList>
            {
              encontrados.map((e: any) => (
                <IonItem onClick={() => seleccionar(e)}>
                  <IonLabel>{e.username} - {e.primer_nombre}</IonLabel>
                </IonItem>
              ))
            }
          </IonList>
        }
        {
          Object.keys(seleccionado).length > 0 ? <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {seleccionado.primer_nombre} {seleccionado.primer_apellido}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>Localidad: </IonLabel>{seleccionado.localidad}</IonItem>
                <IonItem>
                  <IonLabel>Dirección: </IonLabel>{seleccionado.direccion}</IonItem>
                <IonItem>
                  <IonLabel>Teléfono: </IonLabel>{seleccionado.telefono}</IonItem>
              </IonList>
            </IonCardContent>
            <IonRow className='ion-padding-horizontal'>
              <IonCol>
                <IonInput onIonInput={(e: any) => {
                  setForm({
                    ...form,
                    lectura_actual: e.detail.value
                  })
                }}
                  labelPlacement="floating" fill="solid" type='number' label="Ingrese valor lectura"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className='ion-justify-content-center ion-padding-horizontal'>
              <IonCol>
                <IonButton expand='block' color={'danger'} fill='outline' onClick={() => setSeleccionado({})}>Cancelar</IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand='block' onClick={() => guardarLectura()}>Guardar</IonButton>
              </IonCol>
            </IonRow>
          </IonCard>
            :
            <IonRow className='ion-text-center'>
              <IonCol>
                <IonChip color="warning">
                  <IonIcon icon={alertCircleOutline}></IonIcon>
                  <IonLabel>Debe buscar una cédula válida</IonLabel>
                </IonChip>
              </IonCol>
            </IonRow>
        }

      </IonContent>
    </IonPage>
  );
};

export default Tab2;

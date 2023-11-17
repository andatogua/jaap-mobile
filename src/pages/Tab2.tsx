import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    baseURL: `https://andruid.pythonanywhere.com/api/`,
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  const obtenerAbonados = () => {
    api.get("autenticacion/abonados/")
      .then(res => {
        console.log(res.data);
        setAbonados(res.data)
      })
      .catch(error => {
        console.log(error);
      })
    api.get("autenticacion/me/")
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
    api.post("lecturas/crear/", {
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuevo Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
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
          seleccionado && <IonCard>
            <IonCardHeader>
              {seleccionado.primer_nombre}
            </IonCardHeader>
            <IonCardContent>
              <p>{seleccionado.localidad}</p>
              <p>{seleccionado.direccion}</p>
              <p>{seleccionado.telefono}</p>
            </IonCardContent>
            <div>
              <IonInput onIonInput={(e: any) => {
                setForm({
                  ...form,
                  lectura_actual: e.detail.value
                })
              }}
                labelPlacement="floating" fill="outline" label="Ingrese valor lectura"></IonInput>
              <IonButton onClick={() => guardarLectura()}>Guardar</IonButton>
            </div>
          </IonCard>
        }
        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

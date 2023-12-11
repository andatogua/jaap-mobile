import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from "@ionic/react";
import { personCircle, warningOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

const Info: React.FC = () => {
    const location = useLocation()
    const [info, setInfo] = useState({})

    useEffect(() => {
        if (location.state && location.state?.data) {
            let data = location.state?.data
            let nombre = data.empleado.primer_nombre + " " + data.empleado.primer_apellido
            let localidad = data.localidad.nombre
            let fecha = new Date()
            let dia = data.dia_del_mes
            let mes = fecha.getMonth() + 1
            let anio = fecha.getFullYear()
            setInfo({
                ...info,
                nombre: nombre,
                fecha: dia + "/" + mes + "/" + anio,
                localidad: localidad
            })
        } else {
            console.log("Nada para mostrar");
        }
    }, [])

    const handleLogout = () => {
        // Eliminar el token del localStorage o cualquier otra lógica de cierre de sesión
        localStorage.removeItem('token'); // Reemplaza 'tuToken' con el nombre real de tu token
        // Redireccionar a la página de inicio de sesión o a donde desees
        window.location.href = '/'; // Reemplaza '/login' con tu ruta de inicio de sesión
      };

    return (
        <IonPage>

            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                color="warning"
                                style={{ fontSize: "200px" }}
                                icon={warningOutline}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
                                <span>Bienvenido,</span>
                                <h1><b>{info.nombre}</b></h1>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
                                <span>Localidad asignada:</span>
                                <h1><b>{info.localidad}</b></h1>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
                                <span>Fecha de toma de lecturas:</span>
                                <h1><b>{info.fecha}</b></h1>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center ion-margin-top' >
                        <IonButton color="danger" fill='outline' onClick={handleLogout}>
                            Cerrar Sesión
                        </IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Info;

# Manual Técnico: Tuberculosis-Mobile

## 1. Introducción
- **Nombre del Proyecto:** Tuberculosis-Movil
- **Descripción:** Es una aplicación móvil diseñada para pacientes con tuberculosis. Permite grabar videos, visualizar información del paciente y ver tutoriales de uso. Los datos se almacenan en una base de datos centralizada.
- **Plataformas Soportadas:** Android e iOS
- **Herramienta de Desarrollo:** Expo (framework de React Native)

---

## 2. Requisitos del Sistema

### **Hardware Requerido**
- Dispositivo móvil con cámara funcional.
- Almacenamiento disponible: al menos 100 MB.
- Conexión a internet estable.

### **Software Requerido**
- Servidor PR-TUBERCULOSIS-WEB Corriendo <a href="https://github.com/augustoAlborta/PR-TUBERCULOSIS-WEB/tree/main" target="_blank">Url del proyecto Web</a>
- Expo Go App: Instalada en el dispositivo móvil para ejecutar la aplicación.
- Node.js: Versión 14 o superior instalada en el entorno de desarrollo.
- Expo CLI: Instalado globalmente en el sistema de desarrollo.

---

## 3. Instalación y Configuración

### **3.1 Configuración del Entorno de Desarrollo**
1. Instalar Node.js desde [https://nodejs.org](https://nodejs.org) y confirmar la instalación ejecutando:
   ```bash
   node -v
   ```
   ![image](https://github.com/user-attachments/assets/fe5eb5a2-8152-4eb2-bdcd-f4521f91609c)

2. Instalar Expo CLI globalmente con:
   ```bash
   npm install -g expo-cli
   ```
 ![image](https://github.com/user-attachments/assets/5069a424-aefc-4cef-8e89-68263d6554d4)


3. Clonar el repositorio del proyecto:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
   ![image](https://github.com/user-attachments/assets/e3b30e0c-93d8-47df-a893-cf2ac1296114)


4. Instalar dependencias:
   ```bash
   cd Tuberculosis-Movil
   npm install
   ```
![image](https://github.com/user-attachments/assets/59c080bc-ce68-46d5-8b7f-da0e1f80c753)


### **3.2 Configuración en el Dispositivo Móvil**
1. Descarga la app Expo Go desde Google Play o App Store.
2. Asegúrate de que el dispositivo móvil y el equipo de desarrollo estén en la misma red Wi-Fi.

### **3.3 Configuración de la IP en el Archivo .env**
El proyecto utiliza una variable de entorno para manejar la dirección IP del servidor local. Esta configuración debe realizarse en el archivo `.env`, el cual debe contener la IP del equipo de desarrollo.

#### **Pasos para configurar la IP:**
1. Abre una terminal (CMD) y ejecuta el siguiente comando para obtener la IP local:
   ```bash
   ipconfig
   ```
   ![image](https://github.com/user-attachments/assets/683ffac3-36ea-4a7e-a38d-dea45f0fd29f)

2. Busca la sección "Adaptador de red Ethernet" o "Adaptador de LAN inalámbrica" y localiza la dirección **IPv4**.
 ![image](https://github.com/user-attachments/assets/1465c113-f14a-49ed-9271-7d6b348f8a24)

3. Edita el archivo `.env` ubicado en la raíz del proyecto y cambia el valor de la variable de entorno para que coincida con la dirección IPv4 obtenida (modificar solo la IP, la parte de `:3001/api` debe permanecer igual):
   ```bash
   API_URL=http://192.168.0.20:3001/api
   ```
   ![image](https://github.com/user-attachments/assets/b7721db7-ebc6-40e8-a046-f03ad5803840)

4. Guarda los cambios en el archivo `.env` y asegúrate de que la IP esté correctamente configurada antes de iniciar el proyecto.

---

## 4. Ejecución del Proyecto
1. Inicia la aplicación con:
   ```bash
   npx expo start
   ```
   ![image](https://github.com/user-attachments/assets/7cda4f97-6a0d-4703-987c-db42795da0d5)

2. Escanea el código QR generado en la terminal o en el navegador con la app Expo Go. *(En caso de iOS, escanear primero con la cámara y se abrirá automáticamente la aplicación Expo).*
 ![image](https://github.com/user-attachments/assets/a5d65c85-b21d-4143-add0-3339bb085b1e)

3. La aplicación se cargará en el dispositivo móvil.

---
![image](https://github.com/user-attachments/assets/a084c8c8-39fc-4119-b7c6-9ac2b1f804bf)



## 5. Funcionalidades Principales

### **5.1 Inicio de Sesión**
- El paciente se autentica con su número de carnet previamente registrado en la base de datos.
- Introduce el número de carnet, presiona Iniciar Sesión, y si el carnet es válido, se redirige al menú principal.

### **5.2 Menú Principal**
- **Botón "Información del Paciente":** Muestra datos personales del paciente obtenidos de la base de datos.
- **Botón "Grabar Video":** Permite grabar videos que se suben automáticamente a la base de datos al detener la grabación.
- **Botón "Tutorial":** Reproduce un video con instrucciones sobre cómo grabarse.

---

## 6. Arquitectura del Proyecto

### **Frontend:**
- Framework: React Native con Expo.
- Librerías principales:
  - expo-camera
  - expo-av
  - axios
  - react-navigation

### **Backend:**
- API: Node.js con Express.
- Base de Datos: MySql.

---

## 8. Seguridad
- **Autenticación:** Los pacientes inician sesión mediante un número de carnet.
- **Privacidad:** Los videos se almacenan de forma segura en el servidor, con acceso limitado a usuarios autenticados.

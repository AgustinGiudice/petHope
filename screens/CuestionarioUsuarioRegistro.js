import { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from "react-native";
import RegisterModal from "../components/RegisterModal";
import { UserContext } from "../context/UserContext";
import { TokenContext } from "../context/TokenContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Radio from "../components/Radio";
import { responderCuestonario } from "../services/responderCuestionario";
import LoadingComponent from "../components/LoadingComponent";

const CuestionarioUsuarioRegistro = ({ navigation }) => {
  const [indexModal, setIndexModal] = useState(10);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    espacioDisponible: null,
    aceptaCuidadosEspeciales: null,
    tipoAnimal: null,
    edadPreferida: null,
    tamanioPreferido: null,
    tieneNinios: null,
    tieneMascotas: null,
    tuvoMascotas: null,
    descripcion: null,
    fechaDeNacimiento: null,
  });

  const handleNext = async (value) => {
    setError([]);
    if (value === null) {
      setError(["Selecciona una opción"]);
    } else {
      setIndexModal(indexModal + 1);
    }
  };

  const handleActualizarDatos = async () => {
    setIsLoading(true);
    userData.id = currentUser.id;
    const success = await responderCuestonario(
      userData,
      token,
      navigation,
      setCurrentUser
    );

    if (success) {
      navigation.navigate("Paw");
    }
  };

  if (isLoading) {
    <LoadingComponent />;
  } else {
    return (
      <View style={styles.container}>
        <RegisterModal
          visible={indexModal === 0}
          setVisible={setIndexModal}
          setError={setError}
        >
          <View style={styles.warningContainer}>
            <Text style={styles.title}>Hola {currentUser.nombre}!</Text>
            <Text style={styles.title}>
              A continuación te haremos unas preguntas que nos van a permitir
              encontrar las mascotas ideales para vos
            </Text>
            <Text style={styles.warning}>
              ¡Tené en cuenta que, hasta que no contestes estas preguntas no vas
              a poder ver mascotas!
            </Text>
          </View>
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext("ok")}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 1}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>
            ¿Cómo es el lugar donde vivís actualmente?
          </Text>
          <Radio
            data={["Monoambiente", "Departamento", "Casa"]}
            handleSelect={(value) => {
              const formatedValue =
                value === "Monoambiente" ? 1 : value === "Departamento" ? 2 : 3;
              const newData = userData;
              userData.espacioDisponible = formatedValue;
              setUserData(newData);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext(userData.espacioDisponible)}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 2}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>¿Cuál es tu ocupación?</Text>
          <Radio
            data={[
              "Desocupado/a",
              "Estudiante",
              "Trabajador/a",
              "Estudiante y Trabajador/a",
            ]}
            handleSelect={(value) => {
              console.log(value);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext("ok")}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 3}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>
            ¿Tiene experiencia previa con mascotas?
          </Text>
          <Radio
            data={["Si", "No"]}
            handleSelect={(value) => {
              const formatedValue = value === "No" ? false : true;
              const newData = userData;
              userData.tuvoMascotas = formatedValue;
              setUserData(newData);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext(userData.tuvoMascotas)}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 4}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>
            ¿Tiene alguna preferencia por un tipo de Animal?
          </Text>
          <Radio
            data={["Perro", "Gato", "Indiferente"]}
            handleSelect={(value) => {
              const formatedValue =
                value === "Perro" ? 1 : value === "Gato" ? 2 : 3;
              const newData = userData;
              userData.tipoAnimal = formatedValue;
              setUserData(newData);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext(userData.tipoAnimal)}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 5}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>
            ¿Tiene alguna preferencia de edad para la mascota?
          </Text>
          <Radio
            data={["Cachorro", "Juvenil", "Adulto", "Indistinto"]}
            handleSelect={(value) => {
              const formatedValue =
                value === "Cachorro"
                  ? 1
                  : value === "Juvenil"
                  ? 2
                  : value === "Adulto"
                  ? 3
                  : 4;
              const newData = userData;
              userData.edadPreferida = formatedValue;
              setUserData(newData);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext(userData.edadPreferida)}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 6}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>
            ¿Tiene alguna preferencia de tamaño para la mascota?
          </Text>
          <Radio
            data={["Pequeño", "Mediano", "Grande", "Indistinto"]}
            handleSelect={(value) => {
              const formatedValue =
                value === "Pequeño"
                  ? 1
                  : value === "Mediano"
                  ? 2
                  : value === "Grande"
                  ? 3
                  : 4;
              const newData = userData;
              userData.tamanioPreferido = formatedValue;
              setUserData(newData);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext(userData.tamanioPreferido)}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 7}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>¿Tiene niños en casa?</Text>
          <Radio
            data={[
              "No",
              "Si, Menores de 5 años",
              "Si, entre 12 y 15 años",
              "Si, mayores de 15 años",
            ]}
            handleSelect={(value) => {
              const formatedValue =
                value === "No"
                  ? 1
                  : value === "Si, Menores de 5 años"
                  ? 2
                  : value === "Si, entre 12 y 15 años"
                  ? 3
                  : 4;
              const newData = userData;
              userData.tieneNinios = formatedValue;
              setUserData(newData);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext(userData.tieneNinios)}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 8}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>¿Tiene otras mascotas en casa?</Text>
          <Radio
            data={["Si", "No"]}
            handleSelect={(value) => {
              const formatedValue = value === "No" ? false : true;
              const newData = userData;
              userData.tieneMascotas = formatedValue;
              setUserData(newData);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext(userData.tieneMascotas)}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 9}
          setVisible={setIndexModal}
          setError={setError}
        >
          <Text style={styles.title}>
            ¿Está dispuesto a adoptar una mascota con necesidades especiales o
            problemas de salud?
          </Text>
          <Radio
            data={["Si", "No"]}
            handleSelect={(value) => {
              const formatedValue = value === "No" ? false : true;
              const newData = userData;
              userData.aceptaCuidadosEspeciales = formatedValue;
              setUserData(newData);
            }}
          />
          {error.length !== 0
            ? error.map((e) => {
                return (
                  <Text key={e} style={{ color: "red" }}>
                    {e}
                  </Text>
                );
              })
            : null}
          <FontAwesome
            name="arrow-right"
            size={40}
            style={styles.arrow}
            onPress={() => handleNext(userData.aceptaCuidadosEspeciales)}
          />
        </RegisterModal>
        <RegisterModal
          visible={indexModal === 10}
          setVisible={setIndexModal}
          setError={setError}
        >
          <View key={33} style={styles.lastContainer}>
            <Text style={styles.title}>
              ¡Muchas gracias por contestar el cuestionario!
            </Text>
            <Text>Ya podés encontrar tu mascota soñada</Text>
            <TouchableOpacity
              onPress={handleActualizarDatos}
              style={styles.botonStart}
            >
              {isLoading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text style={styles.start}>Empezar</Text>
              )}
            </TouchableOpacity>
          </View>
        </RegisterModal>
        {/* <RegisterModal visible={indexModal === 11} setVisible={setIndexModal}>
        <View key={33} style={styles.lastContainer}>
          {!index ? (
            <>
              <Text style={styles.title}>¡Muchas gracias!</Text>
              <Text>Ya podes continuar</Text>
              <Text>
                Acordate que, hasta que no completes el formulario, no vas a ver
                mascotas
              </Text>
              <TouchableOpacity onPress={handleSubmit} style={styles.start}>
                {isLoading ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  <Text style={{ color: "white" }}>Continuar</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text>
                Te pedimos que llenes el formulario a la brevedad para poder
                disfrutar todas las funcionalidades de PetHope
              </Text>
              <TouchableOpacity
                style={styles.start}
                onPress={() => navigation.navigate("Tabs")}
              >
                <Text style={{ color: "white" }}>Volver</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </RegisterModal> */}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C69AE8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  lastContainer: {
    gap: 20,
    alignItems: "center",
  },
  botonStart: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  start: {
    backgroundColor: "#9A34EA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    color: "white",
  },
  arrow: {
    color: "white",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9A34EA",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    color: "white",
    aspectRatio: 1,
    paddingVertical: 20,
  },
});

export default CuestionarioUsuarioRegistro;

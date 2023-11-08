import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import RegisterModal from "../components/RegisterModal";
import Radio from "../components/Select";

const CuestionarioUsuarioRegistro = ({ route }) => {
  return (
    <View style={styles.container}>
      <RegisterModal visible={indexModal === 0} setVisible={setIndexModal}>
        <View style={styles.warningContainer} key={99}>
          <Text style={styles.title}>
            A continuación te haremos unas preguntas que nos van a permitir
            encontrar las mascotas ideales para vos
          </Text>
          <Text style={styles.warning}>
            ¡Tené en cuenta que, hasta que no contestes estas preguntas no vas a
            poder ver mascotas!
          </Text>
        </View>
      </RegisterModal>
      <RegisterModal visible={indexModal === 1} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 2} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 3} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 4} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 5} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 6} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 7} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 8} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 9} setVisible={setIndexModal}>
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
      </RegisterModal>
      <RegisterModal visible={indexModal === 10} setVisible={setIndexModal}>
        <View key={33} style={styles.lastContainer}>
          <Text style={styles.title}>
            ¡Muchas gracias por contestar las preguntas!
          </Text>
          <Text>Ya podes encontrar tu mascota soñada</Text>
          <TouchableOpacity
            onPress={index ? handleActualizarDatos : handleSubmit}
            style={styles.botonStart}
          >
            {loadingFetch ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text style={styles.start}>Empezar</Text>
            )}
          </TouchableOpacity>
        </View>
      </RegisterModal>
      <RegisterModal visible={indexModal === 11} setVisible={setIndexModal}>
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
                {loadingFetch ? (
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
      </RegisterModal>
    </View>
  );
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
  map: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default CuestionarioUsuarioRegistro;

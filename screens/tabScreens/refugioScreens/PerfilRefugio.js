import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../../../context/UserContext";
import Input from "../../../components/Input";
const PerfilRefugio = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const maxNumCharacters = 150;
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({
    nombre: "",
    mail: "",
    apellido: "",
    edad: "",
    telefono: "",
    descripcion: "",
  });
  const userData = currentUser;

  const [editableData, setEditableData] = useState({
    nombre: userData.nombre,
    mail: userData.mail,
    telefono: String(userData.telefono),
    direccion: userData.direccion,
    descripcion: userData.descripcion,
    facebook: userData.facebook,
    instagram: userData.instagram,
    linkDonacion: userData.linkDonacion,
    web: userData.web,
  });

  const handleEditInformation = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Validar campos antes de enviar la solicitud
    const { nombre, apellido, edad, telefono, mail, descripcion } =
      editableData;
    let hasErrors = false;
    const newErrors = {};

    // Validar nombre
    if (!nombre) {
      newErrors.nombre = "Nombre es requerido";
      hasErrors = true;
    } else {
      newErrors.nombre = "";
    }

    // Validar apellido
    if (!apellido) {
      newErrors.apellido = "Apellido es requerido";
      hasErrors = true;
    } else {
      newErrors.apellido = "";
    }

    // Validar edad este no habria que sacarlo?
    if (!edad || isNaN(Number(edad))) {
      newErrors.edad = "Edad debe ser un número";
      hasErrors = true;
    } else {
      newErrors.edad = "";
    }

    // Validar teléfono
    if (!telefono || isNaN(Number(telefono))) {
      newErrors.telefono = "Teléfono debe ser un número";
      hasErrors = true;
    } else {
      newErrors.telefono = "";
    }

    // Validar correo electrónico
    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      newErrors.mail = "Correo electrónico inválido";
      hasErrors = true;
    } else {
      newErrors.mail = "";
    }

    // Validar descripción
    if (!descripcion) {
      newErrors.descripcion = "Descripción es requerida";
      hasErrors = true;
    } else if (descripcion.length > 150) {
      newErrors.descripcion =
        "La descripción no puede superar los 150 caracteres";
      hasErrors = true;
    } else {
      newErrors.descripcion = "";
    }
    //aca
    setErrors(newErrors);

    if (hasErrors) {
      setLoading(false);
      return;
    }

    const updatedUserData = {
      ...editableData,
      edad: Number(editableData.edad), // Convertir la edad de nuevo a número
      telefono: Number(editableData.telefono),
    };
    AsyncStorage.getItem("token").then((cache) => {
      const token = JSON.parse(cache);
      fetch(`${BASE_URL}api/usuarios/edit/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(updatedUserData),
      })
        .then((response) => response.json())
        .then((data) => {
          // actualizar el usuario en el contexto
          setCurrentUser(data.usuario);

          navigation.navigate("PersonalData");
        })
        .catch((error) => {
          console.error("Error actualizando la información:", error);
          setError("Error al actualizar la información");
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  //BORRAR DESPUES
  useEffect(() => {
    // console.log(currentUser);
    console.log("EDITABLEDATA" + JSON.stringify(editableData));
  }, [editableData]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/refugio2.jpg")}
        style={styles.image}
      />

      <ScrollView collapsable={true} style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.fieldName}>Nombre</Text>
          <Input
            value={editableData.nombre}
            setValue={setEditableData}
            atributo="nombre"
            placeholder="Nombre"
            disable={!isEditing}
            onChangeText={(text) =>
              setEditableData({ ...editableData, nombre: text })
            }
          />
          {errors.nombre !== "" && (
            <Text style={styles.errorText}>{errors.nombre}</Text>
          )}
        </View>

        <Text style={styles.fieldName}>Teléfono</Text>
        <View style={styles.textContainer}>
          <Input
            value={editableData.telefono}
            setValue={setEditableData}
            atributo="telefono"
            placeholder="Teléfono"
            disable={!isEditing}
          />
          {errors.telefono !== "" && (
            <Text style={styles.errorText}>{errors.telefono}</Text>
          )}
        </View>
        <Text style={styles.fieldName}>E-mail</Text>
        <View style={styles.textContainer}>
          <Input
            value={editableData.mail}
            setValue={setEditableData}
            atributo="mail"
            placeholder="E-mail"
            disable={!isEditing}
          />
          {errors.mail !== "" && (
            <Text style={styles.errorText}>{errors.mail}</Text>
          )}
        </View>
        <Text style={styles.fieldName}>Descripcion</Text>
        <View style={styles.textContainer}>
          <Input
            value={editableData.descripcion}
            setValue={setEditableData}
            atributo="descripcion"
            placeholder="Descripcion"
            disable={!isEditing}
          />
          <Text
            style={{
              color:
                editableData.descripcion.length <= maxNumCharacters
                  ? "gray"
                  : "red",
              alignSelf: "flex-end",
            }}
          >
            {editableData.descripcion.length}/{maxNumCharacters}
                     
          </Text>
          {errors.descripcion !== "" && (
            <Text style={styles.errorText}>{errors.descripcion}</Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.editButton}
        onPress={handleEditInformation}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200, // Altura de la imagen del refugio
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 20,
    width: "100%",
  },
  dataContainer: {
    marginBottom: 15,
  },
  fieldName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#9A34EA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PerfilRefugio;

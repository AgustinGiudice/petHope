import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getVacunasDetalladas, getCartillaVacunacion, getVacunasSinRegistro } from '../../../services/vacunasServices';
import { TokenContext } from "../../../context/TokenContext";

const MascotaVacunas = ({ route }) => {
    const { mascotaId } = route.params;
    const { token } = useContext(TokenContext);
    const [vacunasDetalladas, setVacunasDetalladas] = useState([]);
    const [cartillaVacunacion, setCartillaVacunacion] = useState([]);
    const [vacunasSinRegistro, setVacunasSinRegistro] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getVacunasDetalladas(mascotaId, token, setVacunasDetalladas);
                await getCartillaVacunacion(mascotaId, token, setCartillaVacunacion);
                await getVacunasSinRegistro(mascotaId, token, setVacunasSinRegistro);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [mascotaId, token]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Vacunas Actuales:</Text>
            {vacunasDetalladas.map(vacuna => (
                <View key={vacuna.id} style={styles.vacunaContainer}>
                    <Text style={styles.vacunaTitle}>Vacuna: {vacuna.nombre}</Text>
                    <Text>Tipo de Animal: {vacuna.tipoAnimal}</Text>
                    <Text>Dosis:</Text>
                    {vacuna.dosis.map(dosis => (
                        <View key={dosis.nombre} style={styles.dosisContainer}>
                            <Text>{dosis.nombre}: {dosis.estado} {dosis.fechaAplicacion ? `(${new Date(dosis.fechaAplicacion).toLocaleDateString()})` : ''}</Text>
                        </View>
                    ))}
                </View>
            ))}

            <Text style={styles.headerText}>Vacunas Pendientes (Nunca aplicadas):</Text>
            {vacunasSinRegistro.map(vacuna => (
                <View key={vacuna.id} style={styles.vacunaContainer}>
                    <Text style={styles.vacunaTitle}>Vacuna: {vacuna.nombre}</Text>
                    <Text>Tipo de Animal: {vacuna.tipoAnimal}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    vacunaContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
    },
    vacunaTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dosisContainer: {
        marginLeft: 20,
        marginTop: 5,
    },
});

export default MascotaVacunas;

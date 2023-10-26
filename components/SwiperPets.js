import { View, Button, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import ItemList from "./ItemList";

const SwiperPets = ({
  mascotas,
  filtros,
  setFiltros,
  index,
  setIndex,
  setResetMatches,
}) => {
  return (
    <Swiper
      cards={mascotas}
      renderCard={(mascota) => {
        return (
          <ItemList
            item={mascota}
            filtros={filtros}
            setFiltros={setFiltros}
            setResetMatches={setResetMatches}
          />
        );
      }}
      onSwiped={() => setIndex(index + 1)}
      cardIndex={0}
      backgroundColor={"#C69AE8"}
      stackSize={2}
      containerStyle={styles.container}
      verticalSwipe={false}
      showSecondCard={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    left: -20.25,
  },
});
export default SwiperPets;

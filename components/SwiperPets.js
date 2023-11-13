import { StyleSheet } from "react-native";
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
      backgroundColor={"#f1f1f1"}
      stackSize={2}
      containerStyle={styles.container}
      verticalSwipe={false}
      showSecondCard={true}
      cardStyle={styles.card}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    left: -20.5,
    top: -60,
  },
});
export default SwiperPets;

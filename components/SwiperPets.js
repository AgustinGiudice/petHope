import { StyleSheet, useWindowDimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import ItemList from "./ItemList";
import AntDesign from "react-native-vector-icons/AntDesign";

const SwiperPets = ({
  mascotas,
  filtros,
  setFiltros,
  index,
  setIndex,
  setResetMatches,
}) => {
  const { width, height } = useWindowDimensions();

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
      overlayLabelWrapperStyle={{
        position: "absolute",
        zIndex: 2,
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      overlayLabels={{
        right: {
          element: (
            <AntDesign
              name="close"
              size={height / 5}
              color="rgba(153,82,203,1)"
            />
          ) /* Optional */,
          title: "NOPE",
          style: {
            wrapper: {
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "rgba(195,154,232,0.45)",
            },
          },
        },
        left: {
          element: (
            <AntDesign
              name="hearto"
              size={height / 5}
              color="rgba(153,82,203,1)"
            />
          ) /* Optional */,
          title: "LIKE",
          style: {
            wrapper: {
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              right: -40,
              padding: 20,
              backgroundColor: "rgba(195,154,232,0.45)",
            },
          },
        },
      }}
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

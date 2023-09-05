import React from "react";
import { Ionicons } from "@expo/vector-icons";

function CircularIcon({ iconName, size, color, backgroundColor }) {
  const iconSize = size * 1.5; // Aumentar el tamaño del ícono para que sea circular
  const borderRadius = iconSize / 2; // Establecer el radio del borde para hacerlo circular

  return (
    <Ionicons
      name={iconName}
      size={iconSize}
      color={color}
      style={{
        backgroundColor,
        width: iconSize, // Establecer el ancho y alto para que sea circular
        height: iconSize,
        borderRadius,
        justifyContent: "center",
        alignItems: "center", // Centrar el contenido dentro del círculo
      }}
    />
  );
}

export default CircularIcon;

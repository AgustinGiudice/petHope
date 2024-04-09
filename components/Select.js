import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Select = ({ defaultValue, values, setValues, texto, width }) => {
  const buttonWidth = width ? width : "80%"; // Si width está definido, lo usa; de lo contrario, usa el 80% por defecto

  return (
    <SelectDropdown
      data={values}
      defaultValue={defaultValue}
      onSelect={(item, index) => setValues(item)}
      buttonStyle={{
        borderColor: "#C69AE8",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#e3e3e3",
        width: buttonWidth, // Utiliza el ancho definido o el 80% por defecto
      }}
      renderDropdownIcon={() => {
        return (
          <MaterialIcons
            name="keyboard-arrow-down"
            size={25}
            style={{ color: "#C69AE8" }}
          />
        );
      }}
      buttonTextStyle={{
        color: "#9A34EA",
      }}
      defaultButtonText={texto}
      rowStyle={{
        borderColor: "#9A34EA",
        borderRightWidth: 5,
        borderLeftWidth: 5,
        borderBottomColor: "#9A34EA",
      }}
      rowTextStyle={{ color: "#9A34EA" }}
      selectedRowStyle={{ backgroundColor: "#C69AE8" }}
      selectedRowTextStyle={{ color: "#e3e3e3" }}
      dropdownOverlayColor="rgba(50,50,50,0.8)"
    />
  );
};

export default Select;

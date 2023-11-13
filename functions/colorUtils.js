export const cambioColorPaw = (numColor) => {
    let color;
  
    switch (numColor) {
      case 1:
        color = "#0080ff";
        break;
      case 2:
        color = "#00D727";
        break;
      case 3:
        color = "#ffdb4d";
        break;
      case 4:
        color = "#ff944d";
        break;
      case 5:
        color = "#ff4d4d";
        break;
      default:
        color = "#ff4d4d";
        break;
    }
  
    return color;
  };
  
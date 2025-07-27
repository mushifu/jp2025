import bridgeAmanecer from "../assets/bridge-theme/amanecer.png";
import bridgeManana from "../assets/bridge-theme/manana.png";
import bridgeDia from "../assets/bridge-theme/dia.png";
import bridgeTarde from "../assets/bridge-theme/tarde.png";
import bridgeAtardecer from "../assets/bridge-theme/atardecer.png";
import bridgeAnochecer from "../assets/bridge-theme/anochecer.png";
import bridgeNoche from "../assets/bridge-theme/noche.png";
import bridgePreview from "../assets/bridge-theme/preview.png";

import shibuyaAmanecer from "../assets/shibuya-theme/amanecer.png";
import shibuyaManana from "../assets/shibuya-theme/manana.png";
import shibuyaDia from "../assets/shibuya-theme/dia.png";
import shibuyaTarde from "../assets/shibuya-theme/tarde.png";
import shibuyaAtardecer from "../assets/shibuya-theme/atardecer.png";
import shibuyaAnochecer from "../assets/shibuya-theme/anochecer.png";
import shibuyaNoche from "../assets/shibuya-theme/noche.png";
import shibuyaPreview from "../assets/shibuya-theme/preview.png";

import toriiAmanecer from "../assets/torii-theme/amanecer.png";
import toriiManana from "../assets/torii-theme/manana.png";
import toriiDia from "../assets/torii-theme/dia.png";
import toriiTarde from "../assets/torii-theme/tarde.png";
import toriiAtardecer from "../assets/torii-theme/atardecer.png";
import toriiAnochecer from "../assets/torii-theme/anochecer.png";
import toriiNoche from "../assets/torii-theme/noche.png";
import toriiPreview from "../assets/torii-theme/preview.png";

export const THEMES = {
  bridgeTheme: {
    name: "Shrine",
    preview: bridgePreview,
    amanecer: bridgeAmanecer,
    manana: bridgeManana,
    dia: bridgeDia,
    tarde: bridgeTarde,
    atardecer: bridgeAtardecer,
    anochecer: bridgeAnochecer,
    noche: bridgeNoche,
    mobilePositionX: "20%"
  },
  shibuyaTheme: {
        name: "Shibuya",
        preview: shibuyaPreview,
      amanecer: shibuyaAmanecer,
      manana: shibuyaManana,
      dia: shibuyaDia,
      tarde: shibuyaTarde,
      atardecer: shibuyaAtardecer,
      anochecer: shibuyaAnochecer,
      noche: shibuyaNoche,
      mobilePositionX: "20%"
    },
    toriiTheme: {
        name: "Torii",
        preview: toriiPreview,
      amanecer: toriiAmanecer,
      manana: toriiManana,
      dia: toriiDia,
      tarde: toriiTarde,
      atardecer: toriiAtardecer,
      anochecer: toriiAnochecer,
      noche: toriiNoche,
      mobilePositionX: "6%"
    }
};
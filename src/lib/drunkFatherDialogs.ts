import { DialogEvent, EmotionalState } from './gameTypes';

const selectBoxerDialogs: Record<string, string[]> = {
  'El Toro': [
    "¡El Toro! Ese tiene unos cuernos más grandes que mi suegra...",
    "Ah, El Toro... me recuerda a cuando yo peleaba... *hic* ...contra la resaca.",
    "¿El Toro? Buena elección, hijo. O hija. O lo que seas... *hic*",
    "El Toro, el Toro... suena a nombre de bar. Me gusta.",
  ],
  'Relámpago': [
    "¡Relámpago! Rápido como yo huyendo de mis responsabilidades...",
    "Ese Relámpago... ojalá fuera así de rápido el servicio en el bar...",
    "¿Relámpago? Bueno, al menos tú tienes esperanzas en algo...",
    "Relámpago... así llamaba a mi exmujer cuando me tiraba las chanclas. *hic*",
  ],
};

const changeBetDialogs = {
  increase: [
    "¡Más dinero! ¡Así se habla! ...o no, qué sé yo...",
    "Sube, sube... como el alcohol a mi cabeza...",
    "¡Eso! ¡Que fluya el dinero! ...que se va igual que viene...",
    "Más apuesta, más emoción... más dolor después... *hic*",
  ],
  decrease: [
    "Cobarde... pero inteligente. Algo que yo nunca fui.",
    "Bajando la apuesta... como mi autoestima cada mañana.",
    "Menos es más, dicen... yo digo que menos es... menos. *hic*",
    "Prudente... aburrido, pero prudente.",
  ],
};

const placeBetDialogs = {
  normal: [
    "¡Ahí va! Que sea lo que Dios quiera... si es que existe...",
    "¡Apuesta hecha! Ahora a rezar... o beber. Mejor beber.",
    "¡Vamos allá! El dinero fácil viene y va... sobre todo va...",
    "¡Hecho! Que gane el mejor... o el que tenga más suerte... *hic*",
  ],
  allIn: [
    "¡¡¡TODO O NADA!!! ¡¡¡COMO MI MATRIMONIO!!! ¡¡¡Y MIRA CÓMO ACABÓ!!!",
    "¡ALL IN! ¡ASÍ SE HACE! ¡O ASÍ SE ARRUINA! ¡QUIÉN SABE!",
    "¡¡¡VAMOS CON TODO!!! *solloza* ...igual que cuando aposté la casa... *hic*",
    "¡TODO AL ROJO! ¡O AL AZUL! ¡AL QUE SEA! ¡¡¡YOLO COMO DICEN LOS JÓVENES!!!",
  ],
};

const winDialogs = {
  normal: [
    "¡¡¡GANAMOS!!! ¡¡¡Por una vez en la vida algo sale bien!!!",
    "¡Victoria! ¡Así se hace! ¡Sabía que podías! ...no, mentira, no lo sabía.",
    "¡¡¡SIIII!!! ¡Otra ronda de... de... de lo que sea! ¡Invitas tú!",
    "¡Ganaste! Mi orgullo crece... como el nivel de alcohol en mi sangre. *hic*",
  ],
  streak: [
    "¡¡¡{count} SEGUIDAS!!! ¡¡¡SOY UN GENIO!!! ¡¡¡BUENO, TÚ, PERO YO TE CRIÉ!!!",
    "¡¡¡RACHA DE {count}!!! ¡¡¡ESTO ES MEJOR QUE... que... que algo muy bueno!!!",
    "¡{count} VICTORIAS! ¡El universo nos sonríe! ...o nos prepara la caída... *hic*",
    "¡¡¡IMPARABLES!!! ¡¡¡{count} WINS!!! ¡¡¡SOMOS LEYENDA!!!",
  ],
};

const loseDialogs = {
  normal: [
    "Perdimos... como siempre... *suspiro* ...pásame la botella.",
    "Ah... derrota. Mi vieja amiga. Te extrañaba... no, mentira.",
    "Nada nuevo bajo el sol... pérdidas y más pérdidas... *hic*",
    "Bueno... al menos tenemos salud... creo... *hic*",
  ],
  streak: [
    "¡¡¡{count} DERROTAS SEGUIDAS!!! ¿Por qué me haces esto? *solloza*",
    "{count} pérdidas... esto es peor que mi divorcio... y mira que eso fue malo...",
    "Otra más... van {count}... igual que mis intentos de dejar de beber...",
    "{count} seguidas... ¿sabes qué? Ya ni duele... miento, duele mucho... *hic*",
  ],
};

const lowBalanceDialogs = [
  "Oye... eso que queda... ¿es todo? *mira nerviosamente la cartera*",
  "Poco dinero... mucha sed... malas combinaciones...",
  "Estamos secos... como mi garganta... necesito un trago... *hic*",
  "Casi sin fondos... me recuerda a mi cuenta bancaria... oh espera, ES mi cuenta bancaria.",
];

const bankruptDialogs = [
  "¡¡¡CERO!!! ¡¡¡ESTAMOS EN CERO!!! ¡¡¡COMO MI VIDA!!! *llora*",
  "Se acabó... como mi matrimonio... como mi hígado... como todo... *hic*",
  "Bancarrota. Otra vez. Al menos somos consistentes en algo...",
  "¡NADA! ¡NO QUEDA NADA! Igual que en mi corazón... *solloza dramáticamente*",
];

const resetDialogs = [
  "¡Dinero nuevo! ¡Vida nueva! ¡Esta vez será diferente! ...no lo será... *hic*",
  "¡Reset! Como cuando reinicio mi vida cada lunes... y cada martes... y...",
  "¡Fondos restaurados! El ciclo del dolor... digo, diversión... continúa.",
  "¡Volvemos! ¡El fénix renace! ¡O el borracho, que es parecido!",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getEmotionalState(
  balance: number,
  winStreak: number,
  loseStreak: number,
  lastResult: 'win' | 'lose' | null
): EmotionalState {
  if (balance === 0) return 'shocked';
  if (balance < 50) return 'desperate';
  if (loseStreak >= 3) return 'resigned';
  if (winStreak >= 3) return 'euphoric';
  if (winStreak >= 2) return 'excited';
  if (loseStreak >= 2) return 'worried';
  if (lastResult === 'win') return 'excited';
  if (lastResult === 'lose') return 'worried';
  return 'neutral';
}

export function getDrunkFatherDialog(event: DialogEvent): string {
  switch (event.type) {
    case 'select_boxer':
      const boxerDialogs = selectBoxerDialogs[event.data?.boxerName || ''];
      return boxerDialogs ? getRandomItem(boxerDialogs) : "¿Ése? Bueno... tú sabrás... *hic*";
    
    case 'change_bet':
      return event.data?.amount && event.data.amount > 0 
        ? getRandomItem(changeBetDialogs.increase)
        : getRandomItem(changeBetDialogs.decrease);
    
    case 'place_bet':
      return event.data?.isAllIn 
        ? getRandomItem(placeBetDialogs.allIn)
        : getRandomItem(placeBetDialogs.normal);
    
    case 'win':
      if (event.data?.streakCount && event.data.streakCount >= 2) {
        return getRandomItem(winDialogs.streak).replace('{count}', String(event.data.streakCount));
      }
      return getRandomItem(winDialogs.normal);
    
    case 'lose':
      if (event.data?.streakCount && event.data.streakCount >= 2) {
        return getRandomItem(loseDialogs.streak).replace('{count}', String(event.data.streakCount));
      }
      return getRandomItem(loseDialogs.normal);
    
    case 'low_balance':
      return getRandomItem(lowBalanceDialogs);
    
    case 'bankrupt':
      return getRandomItem(bankruptDialogs);
    
    case 'reset':
      return getRandomItem(resetDialogs);
    
    default:
      return "*hic* ¿Qué decía...?";
  }
}

import imageNames from "../../../constants/imageNames";

const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
  'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

const map = (char: string): any => {
  switch (char) {
    case ' ':
      return undefined;
    case '0':
      return imageNames.zeroText;
    case '1':
      return imageNames.oneText;
    case '2':
      return imageNames.twoText;
    case '3':
      return imageNames.threeText;
    case '4':
      return imageNames.fourText;
    case '5':
      return imageNames.fiveText;
    case '6':
      return imageNames.sixText;
    case '7':
      return imageNames.sevenText;
    case '8':
      return imageNames.eightText;
    case '9':
      return imageNames.nineText;
    case 'a':
      return imageNames.aText;
    case 'b':
      return imageNames.bText;
    case 'c':
      return imageNames.cText;
    case 'd':
      return imageNames.dText;
    case 'e':
      return imageNames.eText;
    case 'f':
      return imageNames.fText;
    case 'g':
      return imageNames.gText;
    case 'h':
      return imageNames.hText;
    case 'i':
      return imageNames.iText;
    case 'j':
      return imageNames.jText;
    case 'k':
      return imageNames.kText;
    case 'l':
      return imageNames.lText;
    case 'm':
      return imageNames.mText;
    case 'n':
      return imageNames.nText;
    case 'o':
      return imageNames.oText;
    case 'p':
      return imageNames.pText;
    case 'q':
      return imageNames.qText;
    case 'r':
      return imageNames.rText;
    case 's':
      return imageNames.sText;
    case 't':
      return imageNames.tText;
    case 'u':
      return imageNames.uText;
    case 'v':
      return imageNames.vText;
    case 'w':
      return imageNames.wText;
    case 'x':
      return imageNames.xText;
    case 'y':
      return imageNames.yText;
    case 'z':
      return imageNames.zText;
    case 'A':
      return imageNames.AText;
    case 'B':
      return imageNames.BText;
    case 'C':
      return imageNames.CText;
    case 'D':
      return imageNames.DText;
    case 'E':
      return imageNames.EText;
    case 'F':
      return imageNames.FText;
    case 'G':
      return imageNames.GText;
    case 'H':
      return imageNames.HText;
    case 'I':
      return imageNames.IText;
    case 'J':
      return imageNames.JText;
    case 'K':
      return imageNames.KText;
    case 'L':
      return imageNames.LText;
    case 'M':
      return imageNames.MText;
    case 'N':
      return imageNames.NText;
    case 'O':
      return imageNames.OText;
    case 'P':
      return imageNames.PText;
    case 'Q':
      return imageNames.QText;
    case 'R':
      return imageNames.RText;
    case 'S':
      return imageNames.SText;
    case 'T':
      return imageNames.TText;
    case 'U':
      return imageNames.UText;
    case 'V':
      return imageNames.VText;
    case 'W':
      return imageNames.WText;
    case 'X':
      return imageNames.XText;
    case 'Y':
      return imageNames.YText;
    case 'Z':
      return imageNames.ZText;
    case ':':
      return imageNames.symbolColonText;
    case '.':
      return imageNames.symbolFullStopText;
    default:
      return imageNames.symbolQuestionMarkText;
  }
};

type TextMap = {
  char: string;
  isCapital: boolean;
  image: any;
};

const textMapper = (text: string): TextMap[] => {
  let textArr: TextMap[] = [];
  for (let i = 0; i < text.length; i++) {
    const char: string = text.substring(i, i + 1);
    textArr = [...textArr, {
      char: char,
      isCapital: [...alphabet.map(letter => letter.toUpperCase()), 'd'].includes(char),
      image: map(char),
    }];
  }
  return textArr;
};

export default textMapper;
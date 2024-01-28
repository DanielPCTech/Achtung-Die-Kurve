//creator : Daniel Eliasson

function keycodeToChar(keycode) {
	switch(keycode) {
		//specials
		case " ":
		case "  ":
			return " ";
		break;
		//main keyboard
		case 65:
			return "A";
		break;
		case 66:
			return "B";
		break;
		case 67:
			return "C";
		break;
		case 68:
			return "D";
		break;
		case 69:
			return "E";
		break;
		case 70:
			return "F";
		break;
		case 71:
			return "G";
		break;
		case 72:
			return "H";
		break;
		case 73:
			return "I";
		break;
		case 74:
			return "J";
		break;
		case 75:
			return "K";
		break;
		case 76:
			return "L";
		break;
		case 77:
			return "M";
		break;
		case 78:
			return "N";
		break;
		case 79:
			return "O";
		break;
		case 80:
			return "P";
		break;
		case 81:
			return "Q";
		break;
		case 82:
			return "R";
		break;
		case 83:
			return "S";
		break;
		case 84:
			return "T";
		break;
		case 85:
			return "U";
		break;
		case 86:
			return "V";
		break;
		case 87:
			return "W";
		break;
		case 88:
			return "X";
		break;
		case 89:
			return "Y";
		break;
		case 90:
			return "Z";
		break;
		case 221:
			return "Å";
		break;
		case 222:
			return "Ä";
		break;
		case 192:
			return "Ö";
		break;
		case 226:
			return "<";
		break;
		case 188:
			return ",";
		break;
		case 190:
			return ".";
		break;
		case 189:
			return "-";
		break;
		case 186:
			return "¨";
		break;
		case 191:
			return "'";
		break;
		
		//main number row
		case 220:
			return "§";
		break;
		case 49:
			return "1";
		break;
		case 50:
			return "2";
		break;
		case 51:
			return "3";
		break;
		case 52:
			return "4";
		break;
		case 53:
			return "5";
		break;
		case 54:
			return "6";
		break;
		case 55:
			return "7";
		break;
		case 56:
			return "8";
		break;
		case 57:
			return "9";
		break;
		case 48:
			return "0";
		break;
		case 187:
			return "+";
		break;
		case 219:
			return "´";
		break;
		
		//numbpad
		case 96:
			return "num0";
		break;
		case 97:
			return "num1";
		break;
		case 98:
			return "num2";
		break;
		case 99:
			return "num3";
		break;
		case 100:
			return "num4";
		break;
		case 101:
			return "num5";
		break;
		case 102:
			return "num6";
		break;
		case 103:
			return "num7";
		break;
		case 104:
			return "num8";
		break;
		case 105:
			return "num9";
		break;
		case 110:
			return "num,";
		break;
		case 107:
			return "num+";
		break;
		case 109:
			return "num-";
		break;
		case 106:
			return "num*";
		break;
		case 111:
			return "num/";
		break;
		
		//arrow keys
		case 37:
			return "Left";
		break;
		case 39:
			return "Right";
		break;
		case 38:
			return "Up";
		break;
		case 40:
			return "Down";
		break;
		
		//misc
		case 13:
			return "Enter";
		break;
		case 8:
			return "Backspace";
		break;
		case 16:
			return "Shift";
		break;
		case 17:
			return "Control";
		break;
		case 20:
			return "Capslock";
		break;
		case 9:
			return "Tab";
		break;
		case 46:
			return "Delete";
		break;
		case 45:
			return "Insert";
		break;
		case 35:
			return "End";
		break;
		case 36:
			return "Home";
		break;
		case 33:
			return "Page Up";
		break;
		case 34:
			return "Page Down";
		break;
		
		//F keys
		case 112:
			return "F1";
		break;
		case 113:
			return "F2";
		break;
		case 114:
			return "F3";
		break;
		case 115:
			return "F4";
		break;
		case 116:
			return "F5";
		break;
		case 117:
			return "F6";
		break;
		case 118:
			return "F7";
		break;
		case 119:
			return "F8";
		break;
		case 120:
			return "F9";
		break;
		case 121:
			return "F10";
		break;
		case 122:
			return "F11";
		break;
		case 123:
			return "F12";
		break;
		
	}
	
	return null;
}
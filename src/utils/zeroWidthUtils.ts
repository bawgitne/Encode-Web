const ZERO_WIDTH_JOINER = '‍';      // nhị phân 1
const ZERO_WIDTH_NON_JOINER = '‌';   // nhị phân 0
const ZERO_WIDTH_SPACE = '​';       // dấu phân cách

// Simple character list for mapping (đảm bảo nó khớp với bản gốc của bạn)
const simpleCharList = [
  // Chữ cái tiếng Việt (thường và hoa)
  'a', 'á', 'à', 'ả', 'ã', 'ạ', 'ă', 'ằ', 'ắ', 'ẳ', 'ẵ', 'ặ', 'â', 'ầ', 'ấ', 'ẩ', 'ẫ', 'ậ',
  'b', 'c', 'd', 'đ',
  'e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ề', 'ế', 'ể', 'ễ', 'ệ',
  'g', 'h', 'i', 'í', 'ì', 'ỉ', 'ĩ', 'ị',
  'k', 'l', 'm', 'n',
  'o', 'ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ồ', 'ố', 'ổ', 'ỗ', 'ộ', 'ơ', 'ờ', 'ớ', 'ở', 'ỡ', 'ợ',
  'p', 'q', 'r', 's', 't',
  'u', 'ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ừ', 'ứ', 'ử', 'ữ', 'ự',
  'v', 'x', 'y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ',

  'A', 'Á', 'À', 'Ả', 'Ã', 'Ạ', 'Ă', 'Ằ', 'Ắ', 'Ẳ', 'Ẵ', 'Ặ', 'Â', 'Ầ', 'Ấ', 'Ẩ', 'Ẫ', 'Ậ',
  'B', 'C', 'D', 'Đ',
  'E', 'É', 'È', 'Ẻ', 'Ẽ', 'Ẹ', 'Ê', 'Ề', 'Ế', 'Ể', 'Ễ', 'Ệ',
  'G', 'H', 'I', 'Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị',
  'K', 'L', 'M', 'N',
  'O', 'Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ', 'Ô', 'Ồ', 'Ố', 'Ổ', 'Ỗ', 'Ộ', 'Ơ', 'Ờ', 'Ớ', 'Ở', 'Ỡ', 'Ợ',
  'P', 'Q', 'R', 'S', 'T',
  'U', 'Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ', 'Ư', 'Ừ', 'Ứ', 'Ử', 'Ữ', 'Ự',
  'V', 'X', 'Y', 'Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ',

  // Các chữ cái tiếng Anh còn lại (không có trong bộ tiếng Việt dấu)
  'f', 'j', 'w', 'z',
  'F', 'J', 'W', 'Z',

  // Số
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',

  // Ký tự đặc biệt và dấu câu phổ biến
  ' ', '.', ',', '!', '?', ';', ':', '-', '_', '(', ')', '[', ']', '{', '}',
  '/', '\\', '|', '@', '#', '$', '%', '^', '&', '*', '+', '=', '<', '>',
  '\'', '"', '`', '~', '°', '€', '£', '¥', '§', '©', '®', '™', '…',
  '‘', '’', '“', '”', '«', '»', '—', '–'
];

// ---
// ✅ Mã hóa an toàn Unicode với chế độ Simple tùy chọn
// Hàm này vẫn ổn, chỉ để tham khảo để thấy cách Simple Mode hoạt động
export const encodeZeroWidth = (text: string, simpleMode = false): string => {
  if (simpleMode) {
    return text
      .split('')
      .map(char => {
        const index = simpleCharList.indexOf(char);
        if (index === -1) return ''; // Bỏ qua nếu không tìm thấy
        // Simple Mode dùng ZERO_WIDTH_JOINER lặp lại
        return ZERO_WIDTH_JOINER.repeat(index + 1);
      })
      .filter(Boolean)
      .join(' '); // Và khoảng trắng thông thường làm dấu phân cách
  }

  const utf8Bytes = new TextEncoder().encode(text);
  const binary = Array.from(utf8Bytes)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join('');

  const encoded = binary
    .split('')
    .map(bit => bit === '1' ? ZERO_WIDTH_JOINER : ZERO_WIDTH_NON_JOINER)
    .join('');

  return encoded + ZERO_WIDTH_SPACE; // Normal Mode dùng ZERO_WIDTH_SPACE làm dấu phân cách cuối chuỗi
};



// ✅ Giải mã an toàn Unicode, tự động phát hiện chế độ
export const decodeZeroWidth = (text: string): string => {
  const delimiterIndex = text.indexOf(ZERO_WIDTH_SPACE);

  // Nếu tìm thấy dấu phân cách (dấu hiệu của Normal Mode)
  if (delimiterIndex !== -1) {
    const potentialNormalEncodedPart = text.substring(0, delimiterIndex);
    const relevantZeroWidthRegexForNormal = new RegExp(`[${ZERO_WIDTH_JOINER}${ZERO_WIDTH_NON_JOINER}]`, 'g');
    const normalModeMatches = potentialNormalEncodedPart.match(relevantZeroWidthRegexForNormal);

    if (normalModeMatches && normalModeMatches.length > 0) {
      // Logic giải mã Normal Mode (phần này đã được sửa lỗi trước đó và vẫn chính xác)
      const binary = normalModeMatches
        .map(char => (char === ZERO_WIDTH_JOINER ? '1' : '0'))
        .join('');

      const bytes: number[] = [];
      for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8);
        if (byte.length === 8) {
          bytes.push(parseInt(byte, 2));
        }
      }
      try {
        return new TextDecoder().decode(new Uint8Array(bytes));
      } catch (e) {
        console.error("Lỗi giải mã tin nhắn chế độ normal:", e);
        return '';
      }
    }
    return ''; // Dấu phân cách có nhưng không có dữ liệu hợp lệ
  } else {
    // Nếu không tìm thấy dấu phân cách, giả định là Simple Mode.
    const containsZeroWidthJoiner = text.includes(ZERO_WIDTH_JOINER);
    if (!containsZeroWidthJoiner) {
      return ''; // Không có ZWJ nào, nên không phải tin nhắn Simple Mode
    }

    // Luồng giải mã Simple Mode
    return text
      .trim()
      .split(' ') // Tách theo khoảng trắng thông thường
      .map(group => {
        // *** ĐÃ SỬA LỖI Ở ĐÂY: Đếm ZERO_WIDTH_JOINER chứ không phải ZERO_WIDTH_SPACE ***
        const count = [...group].filter(c => c === ZERO_WIDTH_JOINER).length;
        return simpleCharList[count - 1] || '';
      })
      .join('');
  }
};



// 📊 Phân tích văn bản + Thử giải mã (không thay đổi)
export const analyzeZeroWidth = (text: string): string => {
  const zeroWidthChars = {
    '​': 'Zero Width Space',
    '‌': 'Zero Width Non-Joiner',
    '‍': 'Zero Width Joiner',
    '': 'Zero Width No-Break Space',
    ' ': 'Space'
  };

  const analysis = {
    totalLength: text.length,
    visibleLength: text.replace(/[​-‍ ]/g, '').length,
    hiddenChars: 0,
    foundChars: {} as Record<string, number>
  };

  for (const char of text) {
    if (char in zeroWidthChars || char === '\uFFFD') {
      analysis.hiddenChars++;
      const name = zeroWidthChars[char as keyof typeof zeroWidthChars] || 'Replacement Character (U+FFFD)';
      analysis.foundChars[name] = (analysis.foundChars[name] || 0) + 1;
    }
  }

  const hasHiddenMessage = analysis.hiddenChars > 0;
  let result = `📊 Kết quả phân tích văn bản\n\n`;
  result += `Tổng số ký tự: ${analysis.totalLength}\n`;
  result += `Số ký tự hiển thị: ${analysis.visibleLength}\n`;
  result += `Số ký tự ẩn: ${analysis.hiddenChars}\n\n`;

  if (hasHiddenMessage) {
    result += `🕵️ Phát hiện ký tự ẩn:\n`;
    for (const [char, count] of Object.entries(analysis.foundChars)) {
      result += `• ${char}: ${count}\n`;
    }

    try {
      const decoded = decodeZeroWidth(text);
      if (decoded) {
        result += `\n🔓 Tin nhắn đã giải mã: "${decoded}"`;
      } else {
        result += `\n❓ Tin nhắn ẩn được phát hiện nhưng không thể giải mã.`;
      }
    } catch (e) {
      result += `\n❌ Không thể giải mã tin nhắn ẩn (Lỗi trong quá trình giải mã).`;
    }
  } else {
    result += `✅ Không tìm thấy ký tự zero-width ẩn nào`;
  }

  return result;
};



// 🫥 Ẩn trong văn bản che phủ (không thay đổi)
export const hideInNormalText = (secretMessage: string, simpleMode = false): string => {
  const encoded = encodeZeroWidth(secretMessage, simpleMode);
  const coverTexts = [
    "Đây là một tin nhắn thông thường có chứa thông tin ẩn.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Con cáo nâu nhanh nhẹn nhảy qua con chó lười biếng.",
    "Chào mừng bạn đến với nền tảng giao tiếp bảo mật của chúng tôi.",
    "Vui lòng xem lại tài liệu đính kèm để biết thêm chi tiết."
  ];

  const coverText = coverTexts[Math.floor(Math.random() * coverTexts.length)];
  const words = coverText.split(' ');
  const insertIndex = Math.floor(words.length / 2);

  return words.slice(0, insertIndex).join(' ') +
    encoded +
    ' ' +
    words.slice(insertIndex).join(' ');
};
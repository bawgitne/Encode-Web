// --- Các hằng số Zero-Width ---
const BIT_1 = '‍'; // Zero Width Joiner      (tượng trưng cho số 1)
const BIT_0 = '‌'; // Zero Width Non-Joiner  (tượng trưng cho số 0)
const DELIMITER = '​'; // Zero Width Space       (dấu hiệu kết thúc tin nhắn)

/**
 * ⚙️ MÃ HÓA VĂN BẢN (ENCODE)
 * Chuyển đổi một chuỗi văn bản bất kỳ thành chuỗi ký tự zero-width.
 * Phương pháp này luôn sử dụng chuẩn UTF-8 để đảm bảo tính toàn vẹn.
 *
 * @param {string} text - Văn bản gốc cần ẩn.
 * @returns {string} - Chuỗi zero-width đã mã hóa.
 */
export const encode = (text: string): string => {
  // 1. Chuyển văn bản thành các byte UTF-8.
  const utf8Bytes = new TextEncoder().encode(text);

  // 2. Chuyển từng byte thành chuỗi nhị phân 8-bit.
  const binaryString = Array.from(utf8Bytes)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join('');

  // 3. Chuyển chuỗi nhị phân thành các ký tự zero-width.
  const encodedData = binaryString
    .split('')
    .map(bit => (bit === '1' ? BIT_1 : BIT_0))
    .join('');

  // 4. Thêm dấu phân cách vào cuối để nhận biết điểm kết thúc.
  return encodedData + DELIMITER;
};

/**
 * ⚙️ GIẢI MÃ VĂN BẢN (DECODE)
 * Chuyển đổi một chuỗi zero-width trở lại văn bản gốc.
 * Tự động tìm kiếm tin nhắn ẩn được mã hóa bằng hàm encode.
 *
 * @param {string} textWithHiddenMessage - Văn bản chứa tin nhắn ẩn.
 * @returns {string} - Tin nhắn gốc đã được giải mã, hoặc chuỗi rỗng nếu không tìm thấy.
 */
export const decode = (textWithHiddenMessage: string): string => {
  // 1. Tìm vị trí của dấu phân cách để xác định dữ liệu ẩn.
  const delimiterIndex = textWithHiddenMessage.indexOf(DELIMITER);
  if (delimiterIndex === -1) {
    return ''; // Không tìm thấy dấu hiệu của tin nhắn ẩn.
  }

  const encodedData = textWithHiddenMessage.substring(0, delimiterIndex);

  // 2. Chuyển các ký tự zero-width trở lại thành chuỗi nhị phân.
  const binaryString = [...encodedData] // Dùng spread `...` để duyệt ký tự Unicode chính xác
    .map(char => {
      if (char === BIT_1) return '1';
      if (char === BIT_0) return '0';
      return ''; // Bỏ qua các ký tự không liên quan khác.
    })
    .join('');
  
  // Dữ liệu phải là một bội số của 8.
  if (!binaryString || binaryString.length % 8 !== 0) {
    return ''; // Dữ liệu không hợp lệ hoặc đã bị hỏng.
  }

  // 3. Chuyển chuỗi nhị phân thành các byte.
  const bytes: number[] = [];
  for (let i = 0; i < binaryString.length; i += 8) {
    bytes.push(parseInt(binaryString.slice(i, i + 8), 2));
  }

  // 4. Giải mã các byte UTF-8 để lấy lại văn bản gốc.
  try {
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch (e) {
    console.error("Lỗi khi giải mã UTF-8:", e);
    return '';
  }
};

/**
 * 📊 PHÂN TÍCH VĂN BẢN VÀ THỬ GIẢI MÃ
 * Phân tích sự hiện diện của các ký tự zero-width và cố gắng giải mã chúng.
 *
 * @param {string} text - Văn bản cần phân tích.
 * @returns {string} - Báo cáo phân tích và kết quả giải mã (nếu có).
 */
export const analyzeAndDecode = (text: string): string => {
  const hiddenChars = [...text].filter(c => [BIT_1, BIT_0, DELIMITER].includes(c));
  
  let result = `📊 Kết quả phân tích:\n`;
  result += `   - Tổng số ký tự: ${text.length}\n`;
  result += `   - Số ký tự ẩn phát hiện: ${hiddenChars.length}\n`;

  if (hiddenChars.length > 0) {
    const decodedMessage = decode(text);
    if (decodedMessage) {
      result += `\n🔓 Tin nhắn đã giải mã: "${decodedMessage}"`;
    } else {
      result += `\n❓ Phát hiện ký tự ẩn nhưng không thể giải mã (có thể dữ liệu đã bị hỏng).`;
    }
  } else {
    result += `\n✅ Không tìm thấy tin nhắn ẩn.`;
  }
  return result;
};

/**
 * 🫥 ẨN TIN NHẮN VÀO VĂN BẢN CHE PHỦ
 *
 * @param {string} secretMessage - Tin nhắn bí mật.
 * @param {string} coverText - Đoạn văn bản dùng để che phủ.
 * @returns {string} - Văn bản che phủ đã chứa tin nhắn bí mật.
 */
export const hideInCoverText = (secretMessage: string, coverText: string): string => {
  const encoded = encode(secretMessage);
  
  // Chèn vào giữa văn bản che phủ
  const insertIndex = Math.floor(coverText.length / 2);
  return coverText.slice(0, insertIndex) + encoded + coverText.slice(insertIndex);
};

function en(msg) {
    return msg;
}

function th(msg) {
    switch (msg.toLowerCase()) {
        case 'user not found': return 'ไม่พบผู้ใช้';
        case 'overlap booking': return 'จองซ้อนทับ';
        case 'user exist': return 'มีชื่อผู้ใช้นี้อยู่แล้ว';
        case 'please fill in the input': return 'กรุณาระบุข้อมูลการล็อคอิน';
        case 'token invalid': return 'token ไม่ถูกต้อง';
        case 'incorrect password': return 'รหัสผ่านไม่ถูกต้อง';
        default: return msg;
    }
}

export default {
    en,
    th
};
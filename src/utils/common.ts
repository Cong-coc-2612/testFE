export function formatGender(value: boolean | null) {
  if (value == null) {
    return '';
  }
  if (value === true) {
    return 'Nam';
  } else {
    return 'Nữ';
  }
}

export function formatTournamentStatus(value: string) {
  if (value === 'initializing') {
    return 'Đang khởi tạo';
  } else if (value === 'opening') {
    return 'Đang mở đăng kí';
  } else if (value === 'processing') {
    return 'Đang diễn ra';
  } else if (value === 'stopped') {
    return 'Đang bị ngưng bởi quản trị viên';
  } else {
    return 'Đã kết thúc';
  }
}

export function formatUserStatus(value: string) {
  if (value === 'active') {
    return 'Đã kích hoạt';
  } else {
    return 'Chưa kích hoạt';
  }
}
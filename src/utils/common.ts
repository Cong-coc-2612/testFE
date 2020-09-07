import { TOURNAMENT_STATUS } from "global";

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
  if (value === TOURNAMENT_STATUS.INITIALIZING) {
    return 'Đang khởi tạo';
  } else if (value === TOURNAMENT_STATUS.OPENING) {
    return 'Đang mở đăng kí';
  } else if (value === TOURNAMENT_STATUS.PROCESSING) {
    return 'Đang diễn ra';
  } else if (value === TOURNAMENT_STATUS.STOPPED) {
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
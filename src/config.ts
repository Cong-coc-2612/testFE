/* tslint:disable */
export interface IConfig {
  apiUrl: {
    baseURI: string;
    tradeX: {
      clientId?: string;
      clientSecret?: string;
      socketCluster?: {
        hostname?: string;
        secure?: boolean;
        port?: number;
        codecEngine: any;
        authTokenName?: string;
        autoReconnect?: boolean;
      };
    };
    domain: {
      [s: string]: {
        clientId?: string;
        clientSecret?: string;
        socketCluster?: {
          hostname?: string;
          secure?: boolean;
          port?: number;
          codecEngine: any;
          authTokenName?: string;
          autoReconnect?: boolean;
        };
      };
    };
  };
  regex: {
    password: RegExp;
    username: RegExp;
    email: RegExp;
    phoneNumber: RegExp;
    number: RegExp;
    orderPasswordKBSV: RegExp;
    teamName: RegExp;
    teamShortName: RegExp;
    userName: RegExp;
    userShortName: RegExp;
  };
  defaultAvatar: string;
  defaultBackground: string;
}

let config: IConfig = {
  apiUrl: {
    // baseURI: 'http://172.20.10.8:8090/',nham'11
    baseURI: 'http://192.168.1.7:8090/',
    // baseURI: 'http://172.20.10.9:8090/',dc
    // baseURI: 'http://192.168.43.170:8090/',
    // baseURI: 'http://172.20.10.9:8090/',
    // long sama
    tradeX: {},
    domain: {},
  },
  regex: {
    password: /^[-\w]{8,32}$/,
    username: /^[-\w]{8,32}$/,
    // eslint-disable-next-line
    email: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
    phoneNumber: /^\d{10}$/,
    number: /^[0-9]*$/,
    teamName: /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]{1,255}$/,
    teamShortName: /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]{1,8}$/,
    userName: /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]{1,32}$/,
    userShortName: /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]{1,32}$/,
    orderPasswordKBSV: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
  },
  defaultAvatar: 'https://thumbs.dreamstime.com/b/user-avatar-icon-button-profile-symbol-flat-person-icon-stock-vector-user-avatar-icon-button-profile-symbol-flat-person-icon-159777243.jpg',
  defaultBackground: 'https://www.sths.org/wp-content/uploads/2018/07/grey-background.jpg',
};

export default config;

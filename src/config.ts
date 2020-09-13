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
  };
  defaultAvatar: string;
  defaultBackground: string;
}

let config: IConfig = {
  apiUrl: {
    // baseURI: 'http://172.20.10.8:8090/',nham'11
    //baseURI: 'http://192.168.1.119:8090/',
    //baseURI: 'http://192.168.43.170:8090/',
    //baseURI: 'https://sport-tournaments-support.herokuapp.com/',
    baseURI: 'https://sport-tournament-support-system.azurewebsites.net/',
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
    teamName: /^[aAÃ Ã€áº£áº¢Ã£ÃƒÃ¡Ã�áº¡áº ÄƒÄ‚áº±áº°áº³áº²áºµáº´áº¯áº®áº·áº¶Ã¢Ã‚áº§áº¦áº©áº¨áº«áºªáº¥áº¤áº­áº¬bBcCdDÄ‘Ä�eEÃ¨Ãˆáº»áººáº½áº¼Ã©Ã‰áº¹áº¸ÃªÃŠá»�á»€á»ƒá»‚á»…á»„áº¿áº¾á»‡á»†fFgGhHiIÃ¬ÃŒá»‰á»ˆÄ©Ä¨Ã­Ã�á»‹á»ŠjJkKlLmMnNoOÃ²Ã’á»�á»ŽÃµÃ•Ã³Ã“á»�á»ŒÃ´Ã”á»“á»’á»•á»”á»—á»–á»‘á»�á»™á»˜Æ¡Æ á»�á»œá»Ÿá»žá»¡á» á»›á»šá»£á»¢pPqQrRsStTuUÃ¹Ã™á»§á»¦Å©Å¨ÃºÃšá»¥á»¤Æ°Æ¯á»«á»ªá»­á»¬á»¯á»®á»©á»¨á»±á»°vVwWxXyYá»³á»²á»·á»¶á»¹á»¸Ã½Ã�á»µá»´zZ0-9 ]{1,255}$/,
    teamShortName: /^[aAÃ Ã€áº£áº¢Ã£ÃƒÃ¡Ã�áº¡áº ÄƒÄ‚áº±áº°áº³áº²áºµáº´áº¯áº®áº·áº¶Ã¢Ã‚áº§áº¦áº©áº¨áº«áºªáº¥áº¤áº­áº¬bBcCdDÄ‘Ä�eEÃ¨Ãˆáº»áººáº½áº¼Ã©Ã‰áº¹áº¸ÃªÃŠá»�á»€á»ƒá»‚á»…á»„áº¿áº¾á»‡á»†fFgGhHiIÃ¬ÃŒá»‰á»ˆÄ©Ä¨Ã­Ã�á»‹á»ŠjJkKlLmMnNoOÃ²Ã’á»�á»ŽÃµÃ•Ã³Ã“á»�á»ŒÃ´Ã”á»“á»’á»•á»”á»—á»–á»‘á»�á»™á»˜Æ¡Æ á»�á»œá»Ÿá»žá»¡á» á»›á»šá»£á»¢pPqQrRsStTuUÃ¹Ã™á»§á»¦Å©Å¨ÃºÃšá»¥á»¤Æ°Æ¯á»«á»ªá»­á»¬á»¯á»®á»©á»¨á»±á»°vVwWxXyYá»³á»²á»·á»¶á»¹á»¸Ã½Ã�á»µá»´zZ0-9 ]{1,8}$/,
    orderPasswordKBSV: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
  },
  defaultAvatar: 'https://thumbs.dreamstime.com/b/user-avatar-icon-button-profile-symbol-flat-person-icon-stock-vector-user-avatar-icon-button-profile-symbol-flat-person-icon-159777243.jpg',
  defaultBackground: 'https://www.sths.org/wp-content/uploads/2018/07/grey-background.jpg',
};

export default config;

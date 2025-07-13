const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUlkREExODk3UUtsck5NaTJtd0Z6eFZ2UzhsRStHbHJRZG9VN21UVFpGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWZydVVaeXFReFJWSmM4ZzF1TiswT2tsTXozWUxza2FFTldVczE0YkxBTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRnkrN2ovU3VnZWxUa1BiUWdFNmhCNzRiTUMwN0VlaFdiZHVTT1Jsa0YwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0cEVsS0NiNVcvUm5pSWorVzE4cGpaQmtESmhSRlN4OE9lQU1XYTJHNzJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktQQWdaeGFaY3ZsLzh0WUlMWU9PRERRVUNDaXVFMWJFQ3VORk5Ta1BpbWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdnYU54SWFPVUp0Mm55WDNKejJVSnFiQmxySlZwd09OZWRwS2hnV29tVzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0EzdzhoOVQ0LytST21ra01TTXQ0UjBaV0xMcTcydWZLMUozRnk4RzNGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1lLSnI1NWNxYm9BYzBXRW5aMWJwUFErY0tzWjhsNlgyMGM2Y2FoQUFnWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRTSVVyK29selYzQnRxMVgyKzNNanV6NHk2VWpRSEUranprdERVTEZGYnJBRVRqSlY4ck9oY3Y4ZjRWaTI0RDhDYlBpWERFM0VjdEtEcks3aE0wWGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzUsImFkdlNlY3JldEtleSI6InRWUkpxeUdjNWhycFRHWEduZmNsYzZHMXd4aGJ4SmVMb1RZRzRaVlNJd3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05XY3ZOY0JFSmY5emNNR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im5MTDV0a0pmS1JQbmx2NDh3VlZqQ0MxYkhZRjFIUDJ5MU5xVlluUm1ER1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6InNLVEkvem9iMVRVOGxjdXUvUldmemM5ZkVITTR4T3FWdHNhMWVnem9YTGU5ZWhld3VCaXR2NmQ0UjVvaGU2MkZtSlpEbFZRVUlaRTl3SC9qbVdVSkN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwVndaVmJHaWhOMk50VEpaL2hiL0tsTnIzVTIwQlJkd0FkenZUYVpXRjUrS0Y5VDc5SWZhZWo2b2p4UkV5T3R6czJGOCtKMFRsZGVXa21PVUZ1bUlnUT09In0sIm1lIjp7ImlkIjoiMjU0NzI2ODU2Nzk1OjUyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjAxMzExNjYwNDg1MDQ6NTJAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcyNjg1Njc5NTo1MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaeXkrYlpDWHlrVDU1YitQTUZWWXdndFd4MkJkUno5c3RUYWxXSjBaZ3htIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTIzOTk1MjUsImxhc3RQcm9wSGFzaCI6IjNSOVozOSJ9',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "🏴‍☠️⃝🅐ϲԑ 𝚔𝖎𝐫қ ❬𝕯❭",
    CAPTION : process.env.CAPTION || "Ϗ𝐈ཞҚ ❬𝕯❭",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254726856795",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    ANTICALL: process.env.ANTICALL || 'no',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
        BOT : process.env.BOT_NAME || '𒋨🏴‍☠️⃝𝘼𝘾𝙀☠️𝘽𝙊𝙏⃝𒋨🉑',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/c9f1fbd5b78d902762e5f.jpg',
    URL: process.env.URL || "https://telegra.ph/file/c9f1fbd5b78d902762e5f.jpg",
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    ANTIDELETEDM: process.env.ANTIDELETEDM|| "non",
    AUTO_REPLY: process.env.AUTO_REPLY || "non",
    ADMGROUP: process.env.ADMGROUP || "non",
    CHAT_BOT : process.env.CHAT_BOT|| "non",
    AUTO_BIO: process.env.AUTO_BIO || "non",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi",
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "non",
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "non",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

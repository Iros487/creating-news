const Discord = require('discord.js');

const bot = new Discord.Client();
let config = require("./config.json");
let prefix = config.prefix;
let uptime;
let alert_roles = [
  "✯Управляющие сервером.✯",
  "✮ Куратор сервера ✮",
  "Тех.поддержка сервера",
  "Следящие за хелперами",
  "✔ Administrator ✔",
  "✔Jr.Administrator✔",
  "✔ Helper ✔",
  "✮Ministers✮",
  "✵Leader✵"
];

bot.on('ready', () => {
  console.log("bot ready");
  uptime = new Date().getTime();
});

bot.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].slice(prefix.length);
  if(cmd == "ping"){
    message.channel.send(`\`PING: ${bot.ping}ms. UPTIME: ${new Date().getTime() - uptime}.\``);
  }
});

bot.on('guildMemberUpdate', async (oldMember, newMember) => {
  if(oldMember.roles.size == newMember.roles.size) return;
  let different = compareRoles(oldMember.roles, newMember.roles);
  if(!alert_roles.includes(different[0])) return;
  let text = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()} | ${oldMember.displayName} | ${generateText(different[0], different[1])} | \`<@${oldMember.id}>\``;
  let channel = oldMember.guild.channels.find(c => c.name == "creating-news-scottdale-info");
  if(!channel) return console.log("Channel 'creating-news-scottdale-info' not found.");
  channel.send(text);
});

bot.login(process.env.TOKEN);

function compareRoles(first_map, second_map){
  if(first_map.size == second_map.size) return false;
  /*[ '@everyone', 'Admins™', 'Dev' ]
    [ '@everyone', 'Admins™' ]*/
  let size = first_map.size > second_map.size;
  let result;
  if(size){
    first_map.forEach(item => {
      if(!second_map.has(item.id)) return result = [item.name, true];
    });
  }else{
    second_map.forEach(item => {
      if(!first_map.has(item.id)) return result = [item.name, false];
    });
  }
  return result;
}

function generateText(role, action){
  let text;
  if(action){
    switch (role){
      case alert_roles[0]:
        text = `Снят с поста управляющего сервером`;
        break;
      case alert_roles[1]:
        text = `Снят с поста куратора сервера`;
        break;
      case alert_roles[2]:
        text = `Снят с поста технического администратора`;
        break;
      case alert_roles[3]:
        text = `Снят с поста следящего за хелперами`;
        break;
      case alert_roles[4]:
        text = `Снят с 4 лвла админки`;
        break;
      case alert_roles[5]:
        text = `Снят с 3 лвла админки`;
        break;
      case alert_roles[6]:
        text = `Снят с 1 лвла админки`;
        break;
      case alert_roles[7]:
        text = `Снят с поста министра`;
        break;
      case alert_roles[8]:
        text = `Снят с поста лидера`;
        break;
      default:
        return false;
    }
  }else{
    switch(role){
      case alert_roles[4]:
        text = `Повышен на 4 лвл адм`;
        break;
      case alert_roles[5]:
        text = `Повышен на 3 лвл адм`;
        break;
      case alert_roles[6]:
        text = `Назначен на 1 лвл адм`;
        break;
      case alert_roles[7]:
        text = `Назначен на пост министра`;
        break;
      case alert_roles[8]:
        text = `Назначен на пост лидера`;
        break;
      case alert_roles[0]:
        text = `Добавлен в состав управляющего сервера`;
        break;
      case alert_roles[1]:
        text = `Назначен на пост куратора сервера`;
        break;
      case alert_roles[2]:
        text = `Назначен на тех.администратора`;
        break;
      case alert_roles[3]:
        text = `Назначен на следящего за хелперами`;
        break;
      default:
        return false;
    }
  }
  return text;
}

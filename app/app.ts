import { ContextMessageUpdate } from 'telegraf';

const dotenv = require('dotenv');
const Telegraf = require('telegraf');


dotenv.config();


const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);


bot.catch((err: any, ctx: ContextMessageUpdate) => {
    console.log(`Error for ${ctx.updateType}`, err, typeof err);
});

bot.start((ctx: ContextMessageUpdate) => {
    if (ctx.from?.id == process.env.MY_TELEGRAM_USER_ID) {
        ctx.reply('ok');
        console.log(ctx.chat?.id);
        bot.telegram.sendDocument(ctx.chat?.id, 'http://algo.cs.uni-frankfurt.de/lehre/algo2/winter1920/uebung/gl11920_uebung03.pdf');
    }
});

bot.launch();


console.log('bot running');




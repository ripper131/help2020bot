const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// توکن بازوی شما
const token = '2096119608:cg9HZb9OF2vVxW4EBQNh4hrKOflrzbhEsygvhrFO';
const apiUrl = `https://tapi.bale.ai/bot${token}`;

// ایجاد سرور Express
const app = express();
app.use(bodyParser.json());

// لیست آموزش‌ها
const tutorials = [
    {
        id: 1,
        title: 'عدم لینک',
        content: `برای رفع مشکل عدم لینک، مراحل زیر را انجام دهید:\n\n
1. از روشن بودن مودم مطمئن شوید.
2. آداپتور مخصوص به مودم را به صورت صحیح به مودم متصل کنید.
3. از اتصال صحیح کابل تلفن به پشت مودم مطمئن شوید.
4. اطمینان پیدا کنید که کابل متصل شده به پشت مودم همان خط تلفنی باشد که رانژه شده است.
5. اطمینان حاصل کنید خط رانژه بوق داشته باشد (این مورد را می‌توانید با اتصال خط تلفن به یک دستگاه تلفن و تماس با شماره دیگری امتحان کنید).
6. در صورت نداشتن بوق لطفا با شماره ۲۰۱۱۷ و خرابی تلفن در تماس باشید.
7. اتصالات اسپلیتر را به پشت مودم به صورت صحیح انجام دهید. (پورت Line به خط تلفن، DSL به کابل متصل شده به مودم، Phone به کابل متصل شده به دستگاه تلفن).
8. تمامی‌دستگاه‌ها از جمله تلفن، Fax، اسپلیتر، دو شاخه ضد برق، صفر بند، Caller ID، کارت خوان و Device‌های دیگر را از روی خط برداشته و مودم را مستقیم بدون اسپلیتر و وسایل جانبی به خط تلفن متصل کنید.
9. پریز و کابل تلفن متصل به مودم را تعویض کنید.
10. در صورت دولاینه بودن پریز تلفن، پریز مربوطه را تعویض و در صورت امکان مودم را به پریز تک لاین متصل کنید.
11. درصورت امکان با مودم دیگر یا از سر خط ورودی ساختمان (جایی که مخابرات سیم تلفن را به شما تحویل داده است) بررسی کنید.\n\n
در صورتی که با چک کردن تمامی‌موارد فوق باز هم چراغ DSL خاموش بود، با پشتیبانی فنی مخابرات با شماره 2020 در تماس باشید. \n\n مشاهده منوی اصلی start/`
    },
    {
        id: 2,
        title: 'قطعی و وصلی',
        content: `برای رفع مشکل قطعی و وصلی، مراحل زیر را انجام دهید:\n\n
1. **کم بودن SNR خط تلفن**:
   - SNR مخفف عبارت Signal to Noise Ratio و به معنای نسبت سیگنال به نویز است. هرچقدر مقدار این عدد کمتر باشد، نشان‌دهنده این است که سیگنال با نویز بیشتری به مودم شما رسیده است. همین نویز، یکی از دلایل قطع و وصل شدن مودم ADSL است و باعث ریست شدن آن می‌شود.
   - برای بررسی SNR خط خود، وارد کنترل پنل مودم شوید (با وارد کردن آی‌پی 192.168.1.1). در پایین صفحه اول، می‌توانید SNR خط خود را مشاهده کنید. اگر SNR کمتر از ۱۰ باشد، با ISP خود تماس بگیرید و موضوع را گزارش کنید.
   - در صورت مواجهه با مشکل قطع و وصلی، اولین اقدام تماس با اپراتور شرکت ارائه‌دهنده اینترنت (ISP) است.

2. **عدم استفاده از Splitter**:
   - جدا نکردن خطوط تلفن و اینترنت از یکدیگر، یکی از مهم‌ترین دلایل قطع و وصل شدن مودم ADSL است. اگر از Splitter (جداکننده سیگنال تلفن از اینترنت) استفاده نکنید، ممکن است هنگام تماس تلفنی، مودم شما ریست شود.
   - دلیل این اتفاق افزایش برق روی خط تلفن در هنگام تماس است. استفاده از Splitter این مشکل را برطرف می‌کند.

3. **نیم‌سوز شدن مودم**:
   - نیم‌سوز شدن مودم یکی از رایج‌ترین دلایل قطع و وصل شدن مودم ADSL است. برای تشخیص این مشکل، یک مودم دیگر را به مدت یک روز امتحان کنید. اگر مودم جدید ریست نشد، مشکل از مودم قبلی شما است.

4. **عبور کابل تلفن یا شبکه از کنار کابل برق**:
   - اگر کابل تلفن یا شبکه از کنار کابل برق خانه شما عبور کند، می‌تواند باعث ایجاد نویز و قطع و وصل شدن مودم شود. برای مثال، روشن کردن لامپ ممکن است باعث ریست شدن مودم شود.

5. **نوسان برق پورت USB**:
   - استفاده از پورت USB برای اتصال مودم به کامپیوتر ممکن است به دلیل نوسانات برق، باعث ریست شدن مودم شود. توصیه می‌شود از این روش برای اتصال مودم استفاده نکنید.

6. **ضعیف بودن آداپتور**:
   - ضعیف بودن آداپتور مودم نیز می‌تواند باعث قطع و وصل شدن مودم شود. این مشکل معمولاً زمانی رخ می‌دهد که پهنای باند زیادی از مودم استفاده می‌شود یا برق منزل ضعیف است.

7. **قرار دادن مودم در جای خنک**:
   - مودم‌ها در محیط‌های گرم ممکن است آسیب ببینند. اگر مودم را در زیر میز یا فضای بسته قرار داده‌اید، آن را به محیطی خنک و باز منتقل کنید.

8. **مشکل تداخل رادیویی**:
   - قرار دادن مودم در کنار دستگاه‌هایی مانند تلفن‌های بی‌سیم، مایکروویو یا تلویزیون‌های هوشمند ممکن است باعث تداخل امواج رادیویی و قطع و وصل شدن مودم شود. مودم را از این دستگاه‌ها دور نگه دارید.\n\n
در صورتی که با چک کردن تمامی‌موارد فوق باز هم مشکل قطع و وصلی ادامه داشت، با پشتیبانی فنی مخابرات با شماره 2020 در تماس باشید. \n\n مشاهده منوی اصلی start/`
    },
    {
        id: 3,
        title: 'اینترنت خاموش',
        content: `برای رفع مشکل اینترنت خاموش، مراحل زیر را انجام دهید:\n\n
1. **پریز برق**:
   - مطمئن شوید که مودم به درستی به پریز برق وصل شده است.
   - کابل‌های برق شل یا آسیب دیده را بررسی کرده و در صورت نیاز آن‌ها را تعویض کنید.
   - برای اطمینان از عملکرد صحیح منبع تغذیه، پریز برق را با دستگاه الکترونیکی دیگری آزمایش کنید.

2. **مشکلات اتصال**:
   - کابل‌های اتصال مودم خود به پریز برق و کامپیوتر/مودم را بررسی کنید. کابل‌های آسیب دیده را تعویض کنید.
   - بررسی کنید که آیا کابل‌ها به طور ایمن به پورت‌های مربوطه خود وصل شده‌اند یا خیر.
   - در صورت نیاز به یک اینترنت پرسرعت و پایدار، می‌توانید به صفحه اینترنت فیبرنوری مراجعه کرده و درخواست خود را ثبت نمایید.

3. **قطعی ISP**:
   - از وب‌سایت ارائه‌دهنده خدمات اینترنت خود بازدید کنید یا با پشتیبانی تماس بگیرید تا هرگونه قطعی گزارش شده در منطقه شما بررسی شود.
   - در صورت ایجاد قطعی سراسری، باید منتظر بمانید تا ISP مشکل را حل کند.

4. **تنظیمات مودم **:
   - احتمال اینکه تنظیمات مودم شما بهم خورده باشد هست.
   - مودم رو به نزدیک مرکز مخابراتی یا  دفاتر پیشخوان ببرید تا  مودم دوباره تنظیم شود.

5. **خرابی سخت‌افزار**:
   - اگر مودم شما قدیمی یا آسیب دیده است، ممکن است مشکلات سخت‌افزاری آن، دلیل روشن نشدن چراغ اینترنت باشد.
   - برای جایگزینی مودم خود با نمونه جدید، با ISP خود تماس گرفته و مشاوره لازم را دریافت کنید.\n\n
در صورتی که با چک کردن تمامی‌موارد فوق باز هم مشکل اینترنت خاموش ادامه داشت، با پشتیبانی فنی مخابرات با شماره 2020 در تماس باشید.`
    }
];

// فایل برای ذخیره اعضا
const membersFilePath = 'members.json';

// خواندن لیست اعضا از فایل
function loadMembers() {
    try {
        return JSON.parse(fs.readFileSync(membersFilePath, 'utf-8')) || [];
    } catch (error) {
        return [];
    }
}

// ذخیره لیست اعضا در فایل
function saveMembers(members) {
    fs.writeFileSync(membersFilePath, JSON.stringify(members), 'utf-8');
}

// ارسال پیام به کاربر
async function sendMessage(chatId, text, replyMarkup = null) {
    try {
        await axios.post(`${apiUrl}/sendMessage`, {
            chat_id: chatId,
            text: text,
            reply_markup: replyMarkup
        });

        // ذخیره chat_id اگر قبلاً ثبت نشده باشد
        let members = loadMembers();
        if (!members.includes(chatId)) {
            members.push(chatId);
            saveMembers(members);
            console.log(`عضو جدید اضافه شد: ${chatId}`);
        }
    } catch (error) {
        console.error('خطا در ارسال پیام:', error.response?.data);
    }
}

// دستور /start
app.post('/webhook', async (req, res) => {
    const update = req.body;

    // بررسی وجود callback_query
    if (update.callback_query) {
        const callbackQuery = update.callback_query;
        const chatId = callbackQuery.message.chat.id;
        const data = callbackQuery.data;

        // اگر callback_data برابر با "start" باشد، دستور /start اجرا می‌شود
        if (data === 'start') {
            let tutorialList = 'به مرکز آموزش مجازی مخابرات ایران خوش آمدید \n\n لیست آموزش ها: \n\n';
            // tutorials.forEach((tutorial, index) => {
            //     tutorialList += `${index + 1}. ${tutorial.title}\n`;
            // });
            // tutorialList += '\nبرای دریافت آموزش، عدد مربوطه را ارسال کنید.';

            // ایجاد دکمه‌های شیشه‌ای
            const replyMarkup = {
                inline_keyboard: tutorials.map((tutorial, index) => [
                    {
                        text: tutorial.title,
                        callback_data: (index + 1).toString()
                    }
                ])
            };

            await sendMessage(chatId, tutorialList, replyMarkup);

            // تایید دریافت callback_query
            try {
                await axios.post(`${apiUrl}/answerCallbackQuery`, { 
                    callback_query_id: callbackQuery.id 
                });
            } catch (error) {
                console.error('خطا در تایید callback_query:', error.response?.data);
            }

            res.sendStatus(200);
            return;
        }

        // اگر callback_data عدد باشد، آموزش مربوطه ارسال می‌شود
        if (!isNaN(data)) {
            const tutorialIndex = parseInt(data) - 1;
            if (tutorialIndex >= 0 && tutorialIndex < tutorials.length) {
                const tutorial = tutorials[tutorialIndex];

                // ارسال محتوای آموزش
                const replyMarkup = {
                    inline_keyboard: [
                        [
                            {
                                text: 'بازگشت به منوی اصلی',
                                callback_data: 'start'
                            }
                        ]
                    ]
                };
                await sendMessage(chatId, tutorial.content, replyMarkup);

                // تایید دریافت callback_query
                try {
                    await axios.post(`${apiUrl}/answerCallbackQuery`, { 
                        callback_query_id: callbackQuery.id 
                    });
                } catch (error) {
                    console.error('خطا در تایید callback_query:', error.response?.data);
                }
            } else {
                await sendMessage(chatId, 'عدد وارد شده نامعتبر است.');
            }
        }

        res.sendStatus(200);
        return;
    }

    // بررسی وجود پیام متنی
    const chatId = update.message?.chat?.id;
    const text = update.message?.text;

    if (text === '/start') {
        let tutorialList = 'به مرکز آموزش مجازی مخابرات ایران خوش آمدید \n\n لیست آموزش ها: \n\n';
        // tutorials.forEach((tutorial, index) => {
        //     tutorialList += `${index + 1}. ${tutorial.title}\n`;
        // });
        // tutorialList += '\nبرای دریافت آموزش، عدد مربوطه را ارسال کنید.';

        // ایجاد دکمه‌های شیشه‌ای
        const replyMarkup = {
            inline_keyboard: tutorials.map((tutorial, index) => [
                {
                    text: tutorial.title,
                    callback_data: (index + 1).toString()
                }
            ])
        };

        await sendMessage(chatId, tutorialList, replyMarkup);
    } else if (text === '/members') {
        // نمایش تعداد اعضا
        const members = loadMembers();
        const memberCount = members.length;
        await sendMessage(chatId, `تعداد اعضا: ${memberCount}`);
    } else if (!isNaN(text)) {
        const tutorialIndex = parseInt(text) - 1;
        if (tutorialIndex >= 0 && tutorialIndex < tutorials.length) {
            const tutorial = tutorials[tutorialIndex];

            // ارسال محتوای آموزش
            const replyMarkup = {
                inline_keyboard: [
                    [
                        {
                            text: 'بازگشت به منوی اصلی',
                            callback_data: 'start'
                        }
                    ]
                ]
            };
            await sendMessage(chatId, tutorial.content, replyMarkup);
        } else {
            await sendMessage(chatId, 'عدد وارد شده نامعتبر است.');
        }
    }

    res.sendStatus(200);
});

// تنظیم وب‌هوک
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`سرور در حال اجرا روی پورت ${PORT}`);
    try {
        await axios.post(`${apiUrl}/setWebhook`, {
            url: 'https://67c7ff4a7a1abf04f701c6ca--grand-paprenjak-4125b8.netlify.app/webhook', // آدرس ngrok خود را وارد کنید
        });
        console.log('وب‌هوک تنظیم شد.');
    } catch (error) {
        console.error('خطا در تنظیم وب‌هوک:', error.response?.data);
    }
});
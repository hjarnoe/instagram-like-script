const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const hashTags = require('./hashTags');

dotenv.config();

(async () => {
    //  Create browser instance ============================
    const browser = await puppeteer.launch({
        headless: false,    //  Set this to true for running script without browser window
        defaultViewport: null,
        args: ['--start-maximized'],
    });
    
    //  Create new page in browser instance   ============================
    const page = await browser.newPage();
    
    //  Go to login URL ============================
    await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', {
        //  Wait for network to be idle before continuing
        waitUntil: 'networkidle0',
    });
    
    //  Wait for cookie consent popup   ============================
    await page.waitForSelector('body > div.RnEpo.Yx5HN._4Yzd2 > div > div > button.aOOlW.bIiDR');
    
    //  Click accept btn on cookie consent popup and wait for 6sec. ============================
    await page.click('body > div.RnEpo.Yx5HN._4Yzd2 > div > div > button.aOOlW.bIiDR', {
        delay: 6000,
    });
    
    //  Wait for username input field   ============================
    await page.waitForSelector("[name='username']");
    
    //  Timeout for 5sec
    await page.waitForTimeout(5000);
    
    //  Enter Username and password
    await page.type("[name='username']", process.env.INSTAGRAM_USERNAME, {
        delay: Math.floor(Math.random() * 200)
    });
    await page.keyboard.down('Tab');
    await page.keyboard.type(process.env.INSTAGRAM_PASSWORD, {
        delay: Math.floor(Math.random() * 200)
    });
    
    //  Wait for login button
    await page.waitForSelector("#loginForm > div > div:nth-child(3) > button");
    
    //  Click the login button
    await page.click("#loginForm > div > div:nth-child(3) > button");
    
    //  Wait for navigation to the page
    await page.waitForNavigation();
    
    //  'Save credentials' popup
    try {
        let notNow = 'html.js.logged-in.client-root.js-focus-visible.sDN5V body div#react-root section._9eogI.E3X2T main.SCxLW.o64aR div.qF0y9.Igw0E.rBNOH.YBx95.vwCYk div.pV7Qt.DPiy6.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.qhGB0.ZUqME div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.MGdpg.aGBdT div.cmbtv button.sqdOP.yWX7d.y3zKF';
        await page.waitForSelector(notNow);
        await page.click(notNow, {
            delay: 2000
        });
    } catch (e) {
        if (e) {
            console.error(e);
        }
    }
    
    //  'Notifications' popup
    try {
        const notificationBtn = 'body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm';
        await page.waitForSelector(notificationBtn);
        await page.waitForTimeout(2000);
        await page.click(notificationBtn, {
            delay: 6000
        });
    } catch (e) {
        if (e) {
            console.error(e);
        }
    }
    
    //  =============   LOOP STARTS HERE    =============== //
    let loopCount = process.env.LOOP_COUNT;
    for (let i = 0; i <= loopCount; i++) {
        
        for (const tag of hashTags) {
            //  Timeout for 4 seconds
            await page.waitForTimeout(Math.floor(4000 + (Math.random() * 5000)));
            
            //  Goto page for given '#' and wait for network idle
            await page.goto(`https://www.instagram.com/explore/tags/${tag}`, {
                waitUntil: 'networkidle2'
            });
            
            //  Wait for most recent post to be loaded
            const mostRecentPost = '#react-root > section > main > article > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(1) > a';
            await page.waitForSelector(mostRecentPost);
            
            //  Wait 2 - 7 seconds before clicking the most recent post
            await page.click(mostRecentPost, {
                delay: Math.floor(2000 + (Math.random() * 7000))
            });
            
            //  Timout for 5 - 14 seconds
            await page.waitForTimeout(Math.floor(5000 + (Math.random() * 9000)));
            
            //  The 'like' and 'closing' of most recent post
            try {
                //  Query for 'like' btn
                const toLikeBtn = await page.$('body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div.QBdPU.rrUvL');
                //  Query for 'unlike' btn
                const removeLikeBtn = await page.$('body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div.QBdPU');
                
                if (toLikeBtn) {    //  =============   If post is not liked yet    =============
                    
                    //  Wait for 4 - 19 seconds before clicking 'like'
                    await page.click('body > div._2dDPU.CkGkG > div.zZYga > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm > div > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button', {
                        delay: Math.floor(4000 + (Math.random() * 15000))
                    });
                    
                    //  Get the 'X' (close btn)
                    const closeBtn = 'body > div._2dDPU.CkGkG > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG > button';
                    
                    //  Click 'Close' after 3 - 18 seconds
                    await page.click(closeBtn, {
                        delay: Math.floor(3000 + (Math.random() * 15000))
                    });
                    
                } else if (removeLikeBtn) {     //  =============   If post is ALREADY liked    =============
                    
                    //  Get the 'X' (close btn)
                    const closeBtn = 'body > div._2dDPU.CkGkG > div.qF0y9.Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG > button';
                    
                    //  Click 'Close' after 3 - 28 seconds
                    await page.click(closeBtn, {
                        delay: Math.floor(3000 + (Math.random() * 25000))
                    });
                }
            } catch (e) {
                if (e) {
                    console.error(e);
                }
            }
            
            //  Have a timeout for between 6 seconds to 5 minutes
            await page.waitForTimeout(Math.floor(6000 + (Math.random() * 300000)));
            
        }
    }
})();

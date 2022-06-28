import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    query,
    changeReadStatus,
    removeEmailMethod,
    getEmailById,
    saveEmail,
    getUnreadMailsCount,
    changeStarStatus,
    getDraftId,
    saveDraft
}

const MAIL_KEY = 'emailDB'

const loggedinUser = {
    email: 'eran@appsus.com',
    fullname: 'Eran Avichzer'
}

const emails = [{
    //Sent
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: true,
    isStared: '',
    receivedAt: '',
    sentAt: 1551133930594,
    removeAt: '',
    from: loggedinUser.email,
    to: 'jennifer@crazy.com',
},
{
    //Sent
    id: 'e001',
    subject: 'Dont miss you!',
    body: 'Dont want to catch up sometimes',
    isRead: true,
    isStared: '',
    receivedAt: '',
    sentAt: 1556633930594,
    removeAt: '',
    from: loggedinUser.email,
    to: 'jennifer@crazy.com',
},
{
    //Sent
    id: 'e002',
    subject: 'I miss you tenderly',
    body: 'I am not an Indian',
    isRead: true,
    isStared: '',
    receivedAt: '',
    sentAt: 15431133930594,
    removeAt: '',
    from: loggedinUser.email,
    to: 'jennifer@crazy.com',
},
{
    //Sent
    id: 'e003',
    subject: 'Honest man',
    body: 'Dear Simon, were is my money!!!!',
    isRead: true,
    isStared: '',
    receivedAt: '',
    sentAt: 1551134930594,
    removeAt: '',
    from: loggedinUser.email,
    to: 'Simon@leviev.com',
},
{
    // Inbox
    id: 'e102',
    subject: 'Bank Leumi',
    body: 'The msg systems ag uses cookies to provide an optimal website experience that is tailored to your specific needs. These includes cookies. ',
    isRead: false,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: '',
    from: 'hen@leumi.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e103',
    subject: 'Hey Eran',
    body: 'Just want to say hello.',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: '',
    from: 'momo@momo.com',
    to: loggedinUser.email
},
{
    // Trash
    id: 'e104',
    subject: 'Fishing',
    body: 'Give your money!',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: 1651064829019,
    from: 'messi@gamil.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e105',
    subject: 'Job interview',
    body: 'Come to work with us at Google',
    isRead: true,
    isStared: true,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: '',
    from: 'hr@gmail.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e106',
    subject: 'Stripe to support crypto payouts on Twitter ',
    body: 'Goldman Sachs said it is examining non-fungible tokens (NFTs) and particularly the "tokenization of real assets," as the investment bank dives deeper into the crypto space. The metaverse where real world assets like real estate are bought and sold as NFTs has been garnering the attention of big names in financial services and a range of other industries. We are actually exploring NFTs in the context of financial instruments, and actually there the power is actually quite powerful. So we work on a number of things," Mathew McDermott, global head of digital assets at Goldman Sachs, said at the Financial Times Crypto and Digital Assets Summit on Wednesday. The bank has dived into crypto.It started offering bitcoin derivatives to investors in 2021 and conducted its first over the counter crypto trade with the digital- asset financial company Galaxy Digital in March this year.',
    isRead: true,
    isStared: false,
    receivedAt: 1651064865019,
    sentAt: '',
    removeAt: '',
    from: 'do_not_reply@mailersp1.binance.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e107',
    subject: 'Danielle’s Apple ID was used to sign in to iCloud on a new device',
    body: 'Dear Eran Avichzer, Danielle’s Apple ID (daniellea2015@icloud.com) was used to sign in to iCloud on a new device. Date and Time: 23 April 2022, 18:27 UTC If the information above looks familiar, you can ignore this message. If you and Danielle do not recognise this device or believe someone may have accessed Danielle’s account, change the account password as soon as possible at https://appleid.apple.com. Sincerely, Apple Support',
    isRead: true,
    isStared: false,
    receivedAt: 1651064865019,
    sentAt: '',
    removeAt: '',
    from: 'noreply@email.apple.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e108',
    subject: 'TalAOfer invited you to TalAOfer/Appsus',
    body: 'You can accept or decline this invitation. You can also head over to https://github.com/TalAOfer/Appsus to check out the repository or visit @TalAOfer to learn a bit more about them. This invitation will expire in 7 days.',
    isRead: false,
    isStared: false,
    receivedAt: 1651055555019,
    sentAt: '',
    removeAt: '',
    from: 'noreply@github.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e109',
    subject: 'Good news regarding order 8149069784480979',
    body: 'Hi Eran Avichzer, Order 8149069784480979 has been shipped! You can click below to track your package, check delivery status or see more details. (Note: It may take up to 24 hours to see tracking information.)',
    isRead: false,
    isStared: false,
    receivedAt: 1651055554444,
    sentAt: '',
    removeAt: '',
    from: 'transaction@notice.aliexpress.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e110',
    subject: '1 new jobs for full stack',
    body: 'Full-Stack Software Engineer Minimum qualifications: Bachelors degree in Computer Science or related technical field, or equivalent practical experience. Experience in software development. Preferred qualifications: Experience with one or more general purpose programming languages including but not limited to: Java, C/C++, C#, Objective C, Python, JavaScript, or Go. Experience with server-side web frameworks such as Ruby-on-Rails, or Django. Significant development experience in Angular, ember.js, backbone.js or similar. Strong knowledge of Web standards and protocols, including JavaScript, HTML, CSS and HTTP. Knowledge in the area of graphics.',
    isRead: false,
    isStared: false,
    receivedAt: 1651888522000,
    sentAt: '',
    removeAt: '',
    from: 'linkedin@linkedin.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e111',
    subject: 'Confirm your email address',
    body: 'Verify your e-mail to finish signing up for Avocode',
    isRead: false,
    isStared: false,
    receivedAt: 1651055555019,
    sentAt: '',
    removeAt: '',
    from: 'hello@avocode.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e200',
    subject: 'Stripe to support crypto payouts on Twitter 💲',
    body: `Global crypto market capitalization dipped 2.2% over the past week to $1.84 trillion, according to data from CoinMarketCap.
    Bitcoin ended the week 1.7% lower at $39,740. 
    The Ethereum Foundation said it holds more than $1.6 billion Ether, and $300 million in crypto investments.
    Blockchain data firm Chainalysis said Ether investors realized more gains than Bitcoin investors in 2021.
    Tesla’s Bitcoin holdings remained unchanged at 43,200 BTC for the first quarter of 2022.
    Crypto funds saw a second straight week of outflows in the week to April 15, CoinShares data showed.`,
    isRead: false,
    isStared: true,
    receivedAt: 1651411320000,
    sentAt: '',
    removeAt: '',
    from: 'Binance@mailersp1.binance.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e201',
    subject: 'Pokémon',
    body: `Were excited to announce that Sandshrew and Alolan Sandshrew, the Mouse Pokémon, will be featured during Marchs Community Day! If youre lucky, you might encounter a Shiny one!
Evolve Sandshrew during the event or up to two hours afterward to get a Sandslash that knows the Charged AttackNight Slash. Similarly, evolve Alolan Sandshrew during the event or up to two hours afterward to get an Alolan Sandslash that knows the Fast Attack Shadow Claw!`,
    isRead: false,
    isStared: true,
    receivedAt: 1651415220000,
    sentAt: '',
    removeAt: '',
    from: 'pokemongo@news.nianticlabs.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e202',
    subject: 'Join the conversation on May 19th',
    body: `There’s a better way to bring businesses and customers together - and we’re excited to share our vision with you. Join us for the very first business messaging event, Conversations 2022, happening on May 19.
    This is an incredible opportunity to learn how you can grow your business via Meta’s messaging platforms, connect with other businesses in your industry, get a first look at exciting product announcements, and take part in the future of business messaging. You won’t want to miss it.`,
    isRead: true,
    isStared: true,
    receivedAt: 1651418880000,
    sentAt: '',
    removeAt: '',
    from: 'metafordevelopers@facebookmail.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e203',
    subject: 'Re: about the car',
    body: `What is your best offer`,
    isRead: false,
    isStared: true,
    receivedAt: 1651333220000,
    sentAt: '',
    removeAt: '',
    from: 'brad123@gmail.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e204',
    subject: 'nadav and 10 others made changes in your shared folders',
    body: `Here's what happened in your shared folders last week`,
    isRead: false,
    isStared: true,
    receivedAt: 1651333555000,
    sentAt: '',
    removeAt: '',
    from: 'dropbox@dropbox.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e205',
    subject: 'Subscription Confirmation',
    body: `Your subscription continues for ₪17.90/month starting 12 July 2022 until cancelled. You can cancel at any time. If you cancel during the 3‑month free trial period, you will immediately lose access to Apple Arcade and the remainder of your trial. You cannot reactivate this trial.	
    For immediate cancellation of your subscription and a prorated refund, contact Apple Support: call 1-800-800-APPL or write to Apple Distribution International, Internet Software & Services, Hollyhill Industrial Estate, Hollyhill, Cork, Republic of Ireland.`,
    isRead: false,
    isStared: true,
    receivedAt: 1651333777000,
    sentAt: '',
    removeAt: '',
    from: 'apple@email.apple.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e206',
    subject: 'Guess Whats Inside❓',
    body: `Competitive Programming is a mental sport which enables you to code a given problem under provided constraints. The purpose of this article is to guide every individual possessing a desire to excel in this sport. This article provides a detailed syllabus for Competitive Programming designed by industry experts to boost the preparation of the readers.`,
    isRead: true,
    isStared: true,
    receivedAt: 1651334444000,
    sentAt: '',
    removeAt: '',
    from: 'geeksforgeeks@geeksforgeeks.org',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e207',
    subject: 'FlightAware.com Flight Alert for UAL91',
    body: `Hello from FlightAware.

    A FlightAware flight alert was set up for you. You will be notified by email of the status of this flight:
    
    Flight:	United 91
    Date:	03/16/2022
    From:	Tel Aviv (TLV / LLBG)
    To:	Newark, NJ (KEWR)
    `,
    isRead: true,
    isStared: true,
    receivedAt: 1651345644000,
    sentAt: '',
    removeAt: '',
    from: 'support@flightaware.com',
    to: loggedinUser.email
},
{
    // Inbox
    id: 'e208',
    subject: 'Thank You For Your Purchase',
    body: `	
    Dear Eran,
    
    Thank you for enrolling in a PlayStation® subscription service.
    
    Your receipt and important subscription terms, including applicable cancellation policy, are stated below. Please read these terms and retain this email for your records.
    
    Your subscription will automatically renew unless and until you cancel.
    `,
    isRead: true,
    isStared: true,
    receivedAt: 1651245644000,
    sentAt: '',
    removeAt: '',
    from: 'Sony@email.sonyentertainmentnetwork.com',
    to: loggedinUser.email
},
{
    // Draft
    id: 'e209',
    subject: 'Try Draft!',
    body: `Here you can write your mail and send it any time you want!`,
    isRead: true,
    isStared: false,
    receivedAt: '',
    sentAt: '',
    removeAt: '',
    from: loggedinUser.email,
    to: 'draft@draft.com'
},
{
    // Trash
    id: 'e1004',
    subject: 'Fishing',
    body: 'Give your money!',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: 1651064829019,
    from: 'sprint@gamil.com',
    to: loggedinUser.email
},
{
    // Trash
    id: 'e1005',
    subject: 'Fishing',
    body: 'Give your money!',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: 1651064829019,
    from: 'number@gamil.com',
    to: loggedinUser.email
},
{
    // Trash
    id: 'e1006',
    subject: 'Fishing',
    body: 'Give your money!',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: 1651064829019,
    from: 'three@gamil.com',
    to: loggedinUser.email
},
{
    // Trash
    id: 'e1007',
    subject: 'Fishing',
    body: 'Give your money!',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: 1651064829019,
    from: 'is_the@gamil.com',
    to: loggedinUser.email
},
{
    // Trash
    id: 'e1008',
    subject: 'Fishing',
    body: 'Give your money!',
    isRead: true,
    isStared: false,
    receivedAt: 1651064829019,
    sentAt: '',
    removeAt: 1651064829019,
    from: 'best@gamil.com',
    to: loggedinUser.email
}




]

_createEmails()

function query(status, searchByTxt, searchByCtg) {
    let emails = _loadFromStorage()
    let emailFilterd = []
    let emailFilterdWithSearch = []
    let emailFilterdWithSearchAndCtg = []
    searchByTxt = searchByTxt.toLowerCase().trim()

    emails.sort((a, b) => b.receivedAt - a.receivedAt)

    for (const email in emails) {
        let currEmail = emails[email]
        if (status === 'inbox') { if (currEmail.receivedAt && !currEmail.removeAt) emailFilterd.push(currEmail) }
        else if (status === 'starred') {
            if (!currEmail.isStared) continue
            emailFilterd.push(currEmail)
        }
        else if (status === 'sent') {
            if (currEmail.sentAt && !currEmail.removeAt) emailFilterd.push(currEmail)
            emailFilterd.sort((a, b) => b.sentAt - a.sentAt)
        }
        else if (status === 'trash') { if (currEmail.removeAt) emailFilterd.push(currEmail) }
        else if (status === 'draft') { if (!currEmail.receivedAt && !currEmail.sentAt) { emailFilterd.push(currEmail) } }
    }

    for (const email in emailFilterd) {
        let currEmail = emailFilterd[email]
        if (currEmail.body.toLowerCase().includes(searchByTxt) || currEmail.subject.toLowerCase().includes(searchByTxt) ||
            currEmail.from.toLowerCase().includes(searchByTxt) || currEmail.to.toLowerCase().includes(searchByTxt)) {
            emailFilterdWithSearch.push(currEmail)
        }
    }

    if (searchByCtg && searchByCtg !== 'all') {
        for (const email in emailFilterdWithSearch) {
            let currEmail = emailFilterdWithSearch[email]
            if (searchByCtg === 'read' && currEmail.isRead) {
                emailFilterdWithSearchAndCtg.push(currEmail)
            }
            else if (searchByCtg === 'unread' && !currEmail.isRead) {
                emailFilterdWithSearchAndCtg.push(currEmail)
            }
            else if (searchByCtg === 'starred' && currEmail.isStared) {
                emailFilterdWithSearchAndCtg.push(currEmail)
            }
            else if (searchByCtg === 'unstarred' && !currEmail.isStared) {
                emailFilterdWithSearchAndCtg.push(currEmail)
            }
        }
    } else {
        emailFilterdWithSearchAndCtg = emailFilterdWithSearch
    }

    return Promise.resolve(emailFilterdWithSearchAndCtg)
}

function _createEmails() {
    const emailsDB = _loadFromStorage()
    if (!emailsDB || !emailsDB.length) {
        const emailsDB = emails
        _saveToStorage(emailsDB)
    }
}

function _createEmail(email) {
    return {
        id: !email.id && utilService.makeId(),
        subject: email.subject,
        body: email.body,
        isRead: email.isRead,
        isStared: false,
        receivedAt: '',
        sentAt: Date.now(),
        to: email.to,

        from: loggedinUser.email,
        fromName: loggedinUser.fullname,
    }
}

function _saveToStorage(emails) {
    storageService.saveToStorage(MAIL_KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(MAIL_KEY)
}

function changeReadStatus(isRead, emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].isRead = isRead
    _saveToStorage(emails)
    return Promise.resolve()
}

function changeStarStatus(isStared, emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].isStared = isStared
    _saveToStorage(emails)
    return Promise.resolve()
}

function removeEmailMethod(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)

    if (emails[emailIdx].removeAt) emails.splice(emailIdx, 1)
    else emails[emailIdx].removeAt = Date.now()

    _saveToStorage(emails)
    return Promise.resolve()
}

function getEmailById(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    return Promise.resolve(emails[emailIdx])
}

function saveEmail(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)

    emails[emailIdx].sentAt = Date.now()
    _saveToStorage(emails)
    return Promise.resolve()
}

function getUnreadMailsCount() {
    let emails = _loadFromStorage()
    let count = 0
    emails.map((email) => {
        if (email.isRead === false) count++
    })
    return Promise.resolve(count / emails.length)
}

function getDraftId() {
    let emails = _loadFromStorage()
    let createEmail;
    createEmail = _createEmail({
        subject: '',
        body: '',
        isRead: true,
        isStared: false,
        receivedAt: '',
        sentAt: '',
        to: ''
    })
    emails.push(createEmail)
    _saveToStorage(emails)

    return Promise.resolve(createEmail.id)
}

function saveDraft(DraftEmail) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === DraftEmail.id)

    emails[emailIdx].to = DraftEmail.to
    emails[emailIdx].subject = DraftEmail.subject
    emails[emailIdx].body = DraftEmail.body
    emails[emailIdx].true = DraftEmail.true
    emails[emailIdx].sentAt = ''

    _saveToStorage(emails)
    return Promise.resolve()
}





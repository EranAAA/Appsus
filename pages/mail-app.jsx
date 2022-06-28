import { emailService } from "../apps/mail/services/mail.service.js";
import { MailSideBar } from "../apps/mail/cmps/mail-sidebar.jsx";
import { eventBusService } from "../services/event-bus-service.js";
import { EmailList } from "../apps/mail/cmps/mail-list.jsx";

export class AppEmail extends React.Component {
    state = {
        emails: '',
        selectedStatus: 'inbox',
        searchByTxt: '',
        searchByCtg: '',
    }

    removeEventSearch;
    removeEventKeep;
    removeEventReload

    componentDidMount() {
        this.loadEmails()
        this.removeEventSearch = eventBusService.on('search-txt', (searchByTxt) => {
            this.getSearchTxt(searchByTxt)
        })
        this.removeEventKeep = eventBusService.on('search-keep', (keepToEmail) => {
            eventBusService.emit('keep-compose', keepToEmail)
        })
        this.removeEventReload = eventBusService.on('reload', (msg) => {
            this.loadEmails()
        })
    }

    componentWillUnmount() {
        this.removeEventSearch()
        this.removeEventKeep()
        this.removeEventReload()
    }

    loadEmails = () => {
        const { selectedStatus, searchByTxt, searchByCtg } = this.state
        emailService
            .query(selectedStatus, searchByTxt, searchByCtg)
            .then((emails) => this.setState({ emails }))
            .then(() => {
                emailService.getUnreadMailsCount()
                    .then((count) => {
                        eventBusService.emit('unread-emails', count)
                    })
            })
    }

    getCurrStatus = (status) => {
        console.log(status);
        this.setState({ selectedStatus: status }, () => {
            this.loadEmails()
        })
    }

    getUpdateMail = (isRead, emailId) => {
        emailService.changeReadStatus(isRead, emailId)
            .then(() => {
                this.loadEmails()
            })
    }

    getUpdateStar = (isStared, emailId) => {
        emailService.changeStarStatus(isStared, emailId)
            .then(() => {
                this.loadEmails()
            })
    }

    getRemoveMail = (emailId) => {
        emailService.removeEmailMethod(emailId)
            .then(() => {
                this.loadEmails()
            })
    }

    getSearchTxt = (txt) => {
        this.setState({ searchByTxt: txt }, () => {
            this.loadEmails()
        })
    }

    getFilterCategory = (ctg) => {
        this.setState({ searchByCtg: ctg }, () => {
            this.loadEmails()
        })
    }

    render() {
        const { emails } = this.state
        if (!emails) return <section>Loader...</section>
        return <section className="app-email">
            <MailSideBar status={this.getCurrStatus} />
            <EmailList emails={emails}
                isReadUpdate={this.getUpdateMail}
                isStarUpdate={this.getUpdateStar}
                removeEmail={this.getRemoveMail}
                filterByCategory={this.getFilterCategory} />
        </section>
    }
}

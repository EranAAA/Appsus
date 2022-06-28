import { eventBusService } from "../../../services/event-bus-service.js";

const { NavLink } = ReactRouterDOM

export class MailSideBar extends React.Component {

    state = {
        unreadEmailsCount: ''
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('unread-emails', (unreadEmailsCount) => {
            this.setState({ unreadEmailsCount })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    newEmailAdd = (email) => {
        console.log('New Email', email);
    }

    render() {
        const { status } = this.props
        const { unreadEmailsCount } = this.state
        const unreadEmailsCountFormat = Intl.NumberFormat("en-GB", { style: "percent" }).format(unreadEmailsCount);
        return <section className="mail-sidebar">
            <div className="sidebar-btn-container">
                <NavLink to={`/email/new_email`}><button className="sidbar-btn"><img src="assets/img/mail/plus.png"></img> Compose</button></NavLink>
            </div>
            <ul className="sidbar-list">
                <NavLink to="/email/inbox" ><li onClick={() => { status('inbox') }} className="filter-btn"><img src="assets/img/mail/inbox.png"></img> <div className="title-sidebar" >&nbsp;&nbsp;&nbsp;&nbsp; Inbox </div> </li></NavLink>
                <NavLink to="/email/starred" ><li onClick={() => { status('starred') }} className="filter-btn"> <img src="assets/img/mail/star.png"></img> <div className="title-sidebar" >&nbsp;&nbsp;&nbsp;&nbsp; Starred </div></li></NavLink>
                <NavLink to="/email/sent" ><li onClick={() => { status('sent') }} className="filter-btn"> <img src="assets/img/mail/sent.png"></img> <div className="title-sidebar" >&nbsp;&nbsp;&nbsp;&nbsp; Sent Mail </div> </li></NavLink>
                <NavLink to="/email/draft" ><li onClick={() => { status('draft') }} className="filter-btn"> <img src="assets/img/mail/draft.png"></img> <div className="title-sidebar" >&nbsp;&nbsp;&nbsp;&nbsp; Draft </div> </li></NavLink>
                <NavLink to="/email/trash" ><li onClick={() => { status('trash') }} className="filter-btn">  <img src="assets/img/mail/trash.png"></img> <div className="title-sidebar" >&nbsp;&nbsp;&nbsp;&nbsp; Trash </div> </li></NavLink>
            </ul>
            <div className="sidebar-precantage-container">
                <div className="sidebar-precantage" style={{ width: unreadEmailsCount * 100 + '%' }}>{unreadEmailsCountFormat}</div>
            </div>
        </section>
    }
}


import { EmailsPreview } from "../cmps/mail-preview.jsx";
import { EmailFilterCategory } from "../cmps/mail-filter-cat.jsx";
import { EmailDetails } from "../pages/mail-details.jsx";
import { EmailCompose } from "../pages/mail-compose.jsx";
import { eventBusService } from "../../../services/event-bus-service.js";

const { Route, NavLink, Link } = ReactRouterDOM;

export class EmailList extends React.Component {

    state = {
        emailId: ''
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('email-id', (emailId) => {
            this.setState({ emailId })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    render() {
        const { emails, isReadUpdate, removeEmail, isStarUpdate, filterByCategory } = this.props
        const { emailId } = this.state
        return (
            <React.Fragment>
                <section className="email-list">
                    {emailId && <Route path={`/email/${emailId}`} component={EmailDetails} />}
                    {<Route path={`/email/new_email`} component={EmailCompose} />}
                    <EmailFilterCategory filterByCategory={filterByCategory}/>
                    {emails.map((email) => (<EmailsPreview key={email.id} email={email}
                        isReadUpdate={isReadUpdate}
                        isStarUpdate={isStarUpdate}
                        removeEmail={removeEmail} />))}
                </section>
            </React.Fragment>
        )
    }
}





import { emailService } from "../services/mail.service.js";

export class EmailDetails extends React.Component {
    state = {
        email: ''
    }

    componentDidMount() {
        const emailId = this.props.match.path.substring(7)
        emailService.getEmailById(emailId)
            .then((email) => {
                this.setState({ email })
            })
    }

    componentWillUnmount() {
        this.onGoBack()
    }

    onGoBack = () => {
        this.props.history.push("/email");
    };

    render() {
        const { email } = this.state

        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "UTC",
        };
        const displayReceivedAt = new Intl.DateTimeFormat('en-GB', options).format(email.receivedAt)
        const displaySentAt = new Intl.DateTimeFormat('en-GB', options).format(email.sentAt)
        const displayTimePerStatus = email.receivedAt ? displayReceivedAt : displaySentAt

        return (
            <div className="overlay">
                <section className="email-details">
                    <div className="compose-header">
                        <div className="new-msg">Message Details</div>
                        <button className="compose-btn-cls" onClick={this.onGoBack}>X</button>
                    </div>

                    <div className="details-main details-main-container" >
                        <div><span className="details-span">To:  </span>{`${email.to}`}</div>
                        <div className="details-main-time">{`${displayTimePerStatus}`}</div>
                    </div>

                    <div className="details-main"><span className="details-span">From:  </span>{`${email.from}`}:</div>
                    <div className="details-main"><span className="details-span">Subject: </span>{` ${email.subject}`}:</div>
                    <div className="details-body">{`${email.body}`}</div>
                </section>
            </div>
        )
    }

}


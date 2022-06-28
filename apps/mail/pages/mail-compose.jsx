import { emailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";

export class EmailCompose extends React.Component {
    state = {
        email: {
            id: '',
            to: '',
            subject: '',
            body: '',
            isRead: true
        },
    }

    removeEvents;
    removeInterval;

    componentDidMount() {
        this.removeEvents = eventBusService.on('keep-compose', (keepToEmail) => {
            this.setState({ email: { ...this.state.email, body: keepToEmail } })
        })

        const emailId = this.props.location.pathname.substring(18)
        emailService.getEmailById(emailId)
            .then((email) => {
                (!email) && (email = this.state.email)
                this.setState(() => ({ email }),
                    () => {
                        (!emailId) ? this.getIdForDraft() : this.saveDraftInterval()
                    })
            })
    }

    componentWillUnmount() {
        this.removeEvents()
        clearInterval(this.removeInterval)
    }

    handleChange = ({ target }) => {
        const { name } = target
        this.setState((prevState) => ({ email: { ...prevState.email, [name]: target.value } }))
    }

    getIdForDraft = () => {
        emailService.getDraftId().then((id) => {
            this.setState((prevState) => ({ email: { ...prevState.email, id } }),
                () => {
                    this.saveDraftInterval()
                })
        })
    }

    saveDraftInterval = () => {
        this.removeInterval = setInterval(() => {
            const { email } = this.state
            emailService.saveDraft(email)
        }, 1000);
    }

    onSent = (ev) => {
        ev.preventDefault()
        if (ev.keyCode == 13) { return false; }

        const { email } = this.state
        emailService.saveEmail(email.id).then(() => {
            eventBusService.emit('reload', 'reload')
            this.props.history.push('/email')
        }).then(() => {
            eventBusService.emit('user-msg', {
                type: 'success', txt: 'Email sent successfully'
            })
        }).catch(() => {
            eventBusService.emit('user-msg', {
                type: 'danger', txt: 'Could not sent message :('
            })
        })
    }

    onGoBack = () => {
        this.props.history.push("/email");
    };

    render() {
        const { email } = this.state
        return (
            <div className="overlay">
                <section className='email-compose'>
                    <div className="compose-header">
                        <div className="new-msg">New Message</div>
                        <button className="compose-btn-cls" onClick={this.onGoBack}>X</button>
                    </div>
                    <form onSubmit={this.onSent}>
                        <input
                            type='email'
                            id='to'
                            name='to'
                            value={email.to}
                            onChange={this.handleChange}
                            placeholder='Recipients'
                        />

                        <input
                            type='text'
                            id='subject'
                            name='subject'
                            value={email.subject}
                            onChange={this.handleChange}
                            placeholder='Subject'
                        />

                        <textarea
                            id='body'
                            name='body'
                            value={email.body}
                            onChange={this.handleChange}
                            rows='10'
                            cols='30'
                        ></textarea>


                        <input className='send-btn' type='submit' value='Send' />
                    </form>
                </section>
            </div>
        )
    }
}

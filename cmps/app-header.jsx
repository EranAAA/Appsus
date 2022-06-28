import { EmailFilter } from "../apps/mail/cmps/mail-filter.jsx";
import { NoteSearch } from "../apps/keep/cmps/note-search.jsx";
import { BookFilter } from "../apps/book/cmps/book-filter.jsx";

const { Link, NavLink, withRouter } = ReactRouterDOM

export class _AppHeader extends React.Component {

    state = {
        isOpen: false
    }

    onOpenModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { pathname } = this.props.location
        const { isOpen } = this.state

        const showSearchEmail = pathname.includes('email') ? true : false
        const showSearchBook = pathname.includes('book') ? true : false
        const showSearchKeep = pathname.includes('keep') ? true : false

        return <header className="app-header">
            <h1> Appsus </h1>

            {showSearchEmail && <EmailFilter />}
            {showSearchBook && <BookFilter />}
            {showSearchKeep && <NoteSearch />}

            <button onClick={() => { this.onOpenModal() }} className="modal-btn" ><img src="assets/img/mail/dots-menu.png"></img></button>
            {isOpen && <div className="modal">
                <nav>
                    <NavLink onClick={() => { this.onOpenModal() }} to="/" exact><img src="assets/img/mail/home2.png"></img></NavLink>
                    <NavLink onClick={() => { this.onOpenModal() }} to="/email/inbox"><img src="assets/img/mail/email.png"></img></NavLink>
                    <NavLink onClick={() => { this.onOpenModal() }} to="/keep"><img src="assets/img/mail/keep2.png"></img></NavLink>
                    <NavLink onClick={() => { this.onOpenModal() }} to="/book" ><img src="assets/img/mail/book.png"></img></NavLink>
                </nav>
            </div>}
        </header>
    }
}

export const AppHeader = withRouter(_AppHeader)


const { Route, NavLink, Link } = ReactRouterDOM;

export class EmailFilterCategory extends React.Component {

    state = {
        searchByCtg: ''
    }

    handleChange = ({ target }) => {
        const { name } = target
        const { searchByCtg } = this.state
        this.setState(() => ({ [name]: target.value }), () => {
            this.props.filterByCategory(target.value)
        })
    }

    onSave = (ev) => {
        ev.preventDefault()
        const { searchByCtg } = this.state
        this.props.filterByCategory(searchByCtg)
    }

    render() {
        const { searchByCtg } = this.state
        return (
            <section className='email-filter-ctg'>
                <form onSubmit={this.onSave}>
                    <select name="searchByCtg" value={searchByCtg} onChange={this.handleChange}>
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                        <option value="starred">Starred</option>
                        <option value="unstarred">Unstarred</option>
                    </select>
                </form>
            </section>
        )
    }
}





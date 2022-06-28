
export class GoogleBookApi extends React.Component {

    state = {
        searchText: ''
    }

    // componentDidMount() {
    //     this.someInputRef.current.focus()
    //   }

    handlerChange = ({ target }) => {
        // Needed Prev?
        this.setState(() => (
            { searchText: target.value }
        ))
    }

    onSearchGoogleBook = (ev) => {
        ev.preventDefault()
        this.props.searchApi(this.state.searchText)
    }

    onSelectGoogleBook = (book) => {
        this.props.selectGoogleBook(book)
    }

    // someInputRef = React.createRef()

    render() {
        const { searchText } = this.state
        const { googleResults } = this.props
        return (
            <section className="serach-container">
                <form onSubmit={this.onSearchGoogleBook}>
                    {/* <label htmlFor="result">Search book:</label> */}
                    <input /*ref={this.someInputRef}*/ className="input-search" id="result" type="text" placeholder="Search book on Google" value={searchText} onChange={this.handlerChange} />
                    {/* <input type="submit" value="Search" /> */}
                </form>
                <ul className="list-result">
                    {googleResults.map(item => (<li key={item.id} ><button onClick={() => { this.onSelectGoogleBook(item) }}>+</button> {item.title} </li>))}
                </ul>
            </section>
        )
    }
}

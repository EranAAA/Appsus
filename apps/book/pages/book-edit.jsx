import { bookService } from "../apps/book/services/cmps/book.service.js";

const { Link } = ReactRouterDOM

export class BookEdit extends React.Component {
  state = {
    book: {
      id: '',
      title: '',
      authors: '',
      listPrice: {
        amount: '',
        currencyCode: 'ILS',
        isOnSale: true,
      },
      publishedDate: '2022',
      language: '',
      description: '',
      subtitle: '',
      pageCount: '',
      categories: '',
      // img
    },
  }

  componentDidMount() {
    console.log('props from BookEdit', this.props)
    this.loadBook()
  }

  loadBook = () => {
    const { bookId } = this.props.match.params
    if (!bookId) return
    bookService.getBookById(bookId).then((book) => this.setState({ book }))
  }

  handleChange = ({ target }) => {
    const { name, type } = target
    const value = type === 'number' ? +target.value : target.value
    //debugger
    this.setState((prevState) =>
      name === 'amount' || name === 'currencyCode' || name === 'isOnSale'
        ? {
          book: {
            ...prevState.book, listPrice: { ...prevState.book.listPrice, [name]: value },
          },
        }
        : { book: { ...prevState.book, [name]: value } }
    )
  }

  onSave = (ev) => {
    ev.preventDefault()
    const { book } = this.state
    bookService.saveBook(book).then(() => {
      this.props.history.push('/book')
    })
  }

  render() {
    const { book } = this.state
    console.log(book.listPrice.amount)
    return (
      <section className='book-edit'>
        <h2>Update Book Section</h2>
        <form onSubmit={this.onSave}>
          <label htmlFor='name'>Title: </label>
          <input
            type='text'
            id='name'
            name='title'
            value={book.title}
            onChange={this.handleChange}
            placeholder='Book Name'
          />

          <label htmlFor='authors'>Author: </label>
          <input type='text' id='authors' name='authors' value={book.authors} onChange={this.handleChange} placeholder='Author Name' />

          <div className='listPrice-container'>
            <label htmlFor='price'>Price: </label>
            <input type='number' id='price' name='amount' value={book.listPrice.amount} onChange={this.handleChange} placeholder='Price' />

            <label htmlFor='currencyCode'>Currency</label>
            <select
              type='text'
              id='currencyCode'
              name='currencyCode'
              value={book.listPrice.currencyCode}
              onChange={this.handleChange}
              placeholder='CurrencyCod'
            >
              <option value='ILS'>ILS</option>
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
            </select>

            <label htmlFor='isOnSale'>On Sale? </label>
            <select
              type='text'
              id='isOnSale'
              name='isOnSale'
              value={book.listPrice.isOnSale}
              onChange={this.handleChange}
              placeholder='On Sale?'
            >
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>

          <label htmlFor='publishedDate'>Publishe dDate: </label>
          <input
            type='number'
            id='publishedDate'
            name='publishedDate'
            value={book.publishedDate}
            onChange={this.handleChange}
            min='1900'
            max='2099'
            step='1'
            placeholder='Publishe DDate'
          />

          <label htmlFor='language'>Language: </label>
          <input
            type='text'
            id='language'
            name='language'
            value={book.language}
            onChange={this.handleChange}
            placeholder='Language'
          />

          <label htmlFor='subtitle'>Subtitle: </label>
          <input
            type='text'
            id='subtitle'
            name='subtitle'
            value={book.subtitle}
            onChange={this.handleChange}
            placeholder='Subtitle'
          />

          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            name='description'
            value={book.description}
            onChange={this.handleChange}
            rows='4'
            cols='30'
          ></textarea>

          <label htmlFor='pageCount'>Page Count: </label>
          <input
            type='number'
            id='pageCount'
            name='pageCount'
            value={book.pageCount}
            onChange={this.handleChange}
            placeholder='Page Count'
          />

          <input className='save-btn' type='submit' value='Save' />
        </form>
      </section>
    )
  }
}

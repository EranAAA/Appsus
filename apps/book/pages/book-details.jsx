import { bookService } from "../services/book.service.js";
import { ReviewAdd } from "../cmps/review-add.jsx";
import { LongTxt } from "../cmps/long-txt.jsx";

const { Link } = ReactRouterDOM;

export class BookDetails extends React.Component {
  state = {
    book: "",
  };

  componentDidMount() {
    this.loadBook();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
  }

  loadBook() {
    const { bookId } = this.props.match.params;
    bookService.getBookById(bookId).then((book) => {
      this.setState({ book });
    });
  }

  onRemoveBook = () => {
    bookService.remove(this.state.book.id).then(this.onGoBack);
  };

  onRemoveReview = (ReviewIdx) => {
    bookService.removeReview(this.state.book.id, ReviewIdx).then(() => {
      this.loadBook();
      console.log("Review Deleted");
    });
  };

  onAddReview = (review) => {
    bookService.addReview(this.state.book.id, review).then(() => {
      //this.props.history.push("/book");
      this.loadBook();
      console.log("Review Saved");
    });
  };

  onGoBack = () => {
    this.props.history.push("/book");
  };

  pageCountLogic() {
    const { pageCount } = this.state.book;
    if (pageCount > 500) return "Long reading";
    else if (pageCount > 200) return "Decent reading";
    else if (pageCount < 100) return "Light reading";
  }

  publishedDateLogic() {
    const { publishedDate } = this.state.book;
    const year = new Date().getFullYear();
    const bookOld = year - publishedDate;
    if (bookOld >= 10) return "Veteran Book";
    if (bookOld <= 1) return "New!";
  }

  render() {
    const { book } = this.state;
    if (!book) return <section>Loading...</section>;
    const red = book.listPrice.amount > 150 ? "redColor" : "";
    const green = book.listPrice.amount < 20 ? "greenColor" : "";
    const nextBookId = bookService.getNextBookId(book.id)

    return (
      <section className='book-details-container'>
        <section className='book-details'>
          <div>
          <div className='main-header'>
                <div className='title'>{book.title}</div>
                <div className='authors'>By: {book.authors}</div>
                <h2> Details </h2>
            <div className="some-container">
              
              
              <div className='main-body'>

                <div className='main-details'>

                  <div className={`amount ${red} ${green}`}><span>Price:</span>{" "}{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</div>
                  <div className='publishedDate'><span>Published Date:</span> {book.publishedDate}{" - "}{this.publishedDateLogic()}</div>
                  <div className='language'><span>Language:</span> {book.language}</div>

                  <LongTxt text={book.description} />

                  <div className='subtitle'><span>subtitle:</span> {book.subtitle}</div>
                  <div className='pageCount'><span>Page Count:</span> {book.pageCount} {" - "}{this.pageCountLogic()}</div>
                  <div className='categories'><span>First Category:</span> {book.categories[0]}</div>
                  <div className="img-container">
                  </div>
                </div>
              </div>
              
              <img className="img-preview" src={book.thumbnail} alt='' />
              </div>
            </div>
            <ReviewAdd
                addReview={this.onAddReview}
                removeReview={this.onRemoveReview}
                bookId={book.id}
                bookReview={book.review}
              />
          </div>


        </section>

        <div className='btn-container'>
          <Link to='/book'><button className='btn-back'>Back</button></Link>
          {/* <Link to={`/book/edit/${book.id}`}><button className='btn-edit'>Edit Book</button></Link> */}
          <button className='btn-delete' onClick={this.onRemoveBook}>Delete Book</button>
          <Link to={`/book/${nextBookId}`}><button className='btn-back'>Next</button></Link>
        </div>

      </section>
    );
  }
}

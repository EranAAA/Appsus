const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {
  
  let priceWithCurrency;
  switch (book.listPrice.currencyCode) {
    case "ILS":
      priceWithCurrency = `${book.listPrice.amount} ₪`;
      break;
    case "USD":
      priceWithCurrency = `$ ${book.listPrice.amount}`;
      break;
    case "EUR":
      priceWithCurrency = `${book.listPrice.amount} €`;
      break;
  }

  return (
    <Link to={`/book/${book.id}`} style={{textDecoration: 'none'}}>
      <article className='book-preview'>
        <div className="book-header">
        <h2>{book.title}</h2>
        <h2>{priceWithCurrency}</h2>
        </div>
        <div className='image'>
          <img src={book.thumbnail} alt='' />
        </div>
      </article>
    </Link>
  );
}

// only one book can be selected?
// Every list need to be seperated? list/ul
// put getcurrencyIcon() logic in function with switch

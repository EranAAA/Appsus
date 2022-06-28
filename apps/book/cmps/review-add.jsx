export class ReviewAdd extends React.Component {
  state = {
    review: {
      fullName: "Books Reader",
      rate: "",
      readAt: new Date().toISOString().slice(0, 10),
      freeText: "...",
    },
  };

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === "number" ? +target.value : target.value;
    this.setState((prevState) => ({
      review: { ...prevState.review, [name]: value },
    }));
  };

  onSave = (ev) => {
    ev.preventDefault();
    const { addReview } = this.props;
    const { review } = this.state;
    addReview(review);
  };

//   onRemoveReview = (idx) => {=
//   }

  render() {
    const { fullName, rate, readAt, freeText } = this.state.review;
    const { bookReview } = this.props;
    return (
      <section className='review-add'>
        <h2>Reviews</h2>
        <div className='review-container'>
          <form onSubmit={this.onSave}>
            <label htmlFor='fullName'>Full Name: </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={fullName}
              onChange={this.handleChange}
              placeholder='Full Name'
            />

            <label htmlFor='rate'>Rate 1-5: </label>
            <input
              type='number'
              id='rate'
              name='rate'
              value={rate}
              onChange={this.handleChange}
              min='1'
              max='5'
              step='0.5'
              required
              placeholder='Rate 1-5'
            />

            <label htmlFor='readAt'>Read At: </label>
            <input
              type='date'
              id='readAt'
              name='readAt'
              value={readAt}
              onChange={this.handleChange}
              placeholder='Read At'
            />

            <label htmlFor='freeText'>Your Review:</label>
            <textarea
              id='freeText'
              name='freeText'
              value={freeText}
              onChange={this.handleChange}
              rows='4'
              cols='30'
            ></textarea>

            <input className='save-btn' type='submit' value='Save Review' />
          </form>
          {/* MAKE TABLE WITH NEW COMP "REVIEW-PREVIEW" */}
          <table>
            <tbody>
              <tr class-name="review-table">
                <th>#</th>
                <th>Full Name</th>
                <th>Rate</th>
                <th >Read At</th>
                <th>Review</th>
                <th>Delete</th>
              </tr>
              {bookReview && bookReview.map((review, idx) => (
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{review.fullName}</td>
                  <td>{review.rate}</td>
                  <td>{review.readAt}</td>
                  <td>{review.freeText}</td>
                  <td><button onClick={() => this.props.removeReview(idx)}>X</button></td>    
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

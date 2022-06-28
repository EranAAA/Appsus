import { eventBusService } from "../../../services/event-bus-service.js"

export class BookFilter extends React.Component {
  state = {
    filter: {
      name: "",
      priceFrom: '',
      priceTo: '',
    },
  };

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === "number" ? +target.value : target.value;
    this.setState((prevState) => (
      { filter: { ...prevState.filter, [name]: value } }),
        () => {
          // this.props.onSetFilter(this.state.filter);
      }
    );
  };

  onFilter = (ev) => {
    ev.preventDefault();
    // this.props.onSetFilter(this.state.filter);
    eventBusService.emit('search-book', this.state.filter.name)
  };

  render() {
    const { filter } = this.state;
    const { name, priceFrom, priceTo } = filter;
    return (
      <section className='book-filter'>
        <form onSubmit={this.onFilter}>
          {/* <label htmlFor='name'>Name:</label> */}
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={this.handleChange}
            placeholder='Search book'
          />

          {/* <label htmlFor='priceFrom'>Price From:</label>
          <input
            type='number'
            id='priceFrom'
            min={0}
            name='priceFrom'
            value={priceFrom}
            onChange={this.handleChange}
            placeholder='From Price'
          />

          <label htmlFor='priceTo'>Price To:</label>
          <input
            type='number'
            id='priceTo'
            min={0}
            name='priceTo'
            value={priceTo}
            onChange={this.handleChange}
            placeholder='To Price'
          /> */}

          {/* <input type='reset' value='Reset' onClick={this.onClear}/> */}
          {/* <input className="input-btn" type='submit' value='Submit' /> */}
        </form>
      </section>
    );
  }
}

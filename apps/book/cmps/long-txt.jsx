export class LongTxt extends React.Component {

  state = {
    readMoreOrLess: "",
    textToDisplay: "",
    isLongTxtShown: false
  };

  componentDidMount() {
    const { text } = this.props;
    text.length >= 100
      ? this.setState({ textToDisplay: text.substring(0, 99), readMoreOrLess: 'Read More..', isLongTxtShown: true })
      : this.setState({ textToDisplay: text, readMoreOrLess: '', isLongTxtShown: false});
  }

  onRead = () => {
    const { isLongTxtShown} = this.state;
    const { text } = this.props;
    isLongTxtShown && this.setState({ textToDisplay: text, readMoreOrLess: 'Read Less..' , isLongTxtShown: false})
    !isLongTxtShown && this.setState({ textToDisplay: text.substring(0, 99), readMoreOrLess: 'Read More..' , isLongTxtShown: true})
  };

  render() {
    const { textToDisplay, readMoreOrLess } = this.state;
    return (
      <section className='long-txt'>
        <span>Description:</span> {textToDisplay}
        <span onClick={this.onRead}>{` ${readMoreOrLess}`}</span>
      </section>
    );
  }
}

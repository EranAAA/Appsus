export class NoteDetails extends React.Component {

    state = {
        text: this.props.note.info.txt,
        color: this.props.note.info.color
    }

    componentWillUnmount() {
        this.onSave()
    }

    onTextChange = ({ target }) => {
        const text = target.value
        this.setState({ text })
    }

    handleInputChange = ({ target }) => {
        const color = target.value
        const id = target.name
        this.setState({ color: target.value })
        this.props.handleColorChange(id, color)
    }

    onDelete = (id) => {
        this.props.handleRemoveNote(id)
        this.props.onGoBack()
    }

    onSave = () => {
        const { id } = this.props.note
        const { text } = this.state
        this.props.handleTextChange(id, text)
        this.props.onGoBack()
    }


    render() {
        const { note, handleChosenNote } = this.props
        let text = note.info.txt
        if (!text) text = ''

        return <div className="note-details">
                <div className="edit-container" style={{ backgroundColor: this.state.color }}>
                    <div className="text-container">
                        {note.type === 'image' && <img className="detail-img" src={note.info.txt} />}
                        {note.type === 'video' && <video src={note.info.txt}></video>}
                        {note.type === 'text' && <textarea value={this.state.text} onChange={this.onTextChange}>  </textarea>}
                        {note.type === 'todo' && <todoNote/>}
                    </div>

                    <div className="edit-btns-container">
                        <div className="edit-btns">
                            <div onClick={() => { this.onDelete(note.id) }} className="edit-btn"> <img src="assets/img/keep/trash.png" alt="" /></div>
                            <label >
                                <img className="edit-btn" src="assets/img/keep/palette.png" alt="" />
                                <input name={note.id} type="color" hidden onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="back-btn-container">
                            <button className="back-btn" onClick={this.onSave}> Save </button>
                            <button className="back-btn" onClick={this.props.onGoBack}> Back </button>
                        </div>
                    </div>
                </div>

            </div>
            // {<section className="note-details-container">}
        // </section>
    }
}
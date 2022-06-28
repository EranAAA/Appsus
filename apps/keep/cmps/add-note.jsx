export class AddNote extends React.Component {
    state = {
        type: 'text',
        text: '',
        isSelected: false
    }

    onChangeInput = (type) => {
        this.setState({ type })
        if (type !== 'text') this.closeTextArea()
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { text, type } = this.state
        this.props.handleAddNote(text, type)
        this.setState({ text: '' })
    }

    handleChange = ({ target }) => {
        const text = target.value
        this.setState({ text })
    }

    openTextArea = () => {
        this.setState({ isSelected: true })
    }

    closeTextArea = () => {
        this.setState({ isSelected: false })
        this.setState({ text: '' })
    }

    onSave = () => {
        const { text, type } = this.state
        this.props.handleAddNote(text, type)
        this.closeTextArea()
    }

    render() {
        const { type } = this.state

        return <section className="add-note" >

            <form className="add-form" onSubmit={this.onSubmit}>
                {type === 'text' && this.state.isSelected && <section className="text-area-add">
                    <textarea value={this.state.text} type="text" placeholder="What's on your mind?" onChange={this.handleChange} />
                    <div className="option-container">
                        <div className="img-container">
                            <img src="assets/img/keep/text.png" onClick={() => this.onChangeInput('text')} /></div>
                        <div className="img-container">
                            <img src="assets/img/keep/image.png" onClick={() => this.onChangeInput('image')} />
                        </div>
                        <div className="img-container">
                            <img src="assets/img/keep/video.png" onClick={() => this.onChangeInput('video')} />
                        </div>
                        <div className="img-container">
                            <img src="assets/img/keep/todo.png" onClick={() => this.onChangeInput('todo')} />
                        </div>
                        <section className="save-btns">
                            <button type="button" className="save-btn" onClick={this.closeTextArea}> Close </button>
                            <button className="save-btn" onClick={this.onSave}> Save </button>
                        </section>
                    </div>
                </section>}
                {type === 'text' && !this.state.isSelected && <input value={this.state.text} type="text" placeholder="What's on your mind?" onClick={this.openTextArea} onChange={this.handleChange} />}
                {type === 'image' && <input value={this.state.text} type="text" placeholder="Enter img URL" onChange={this.handleChange} />}
                {type === 'video' && <input value={this.state.text} type="text" placeholder="Enter video URL" onChange={this.handleChange} />}
                {type === 'todo' && <input value={this.state.text} type="text" placeholder="Enter CSV" onChange={this.handleChange} />}
                {!this.state.isSelected && <div className="option-container">
                    <div className="img-container">
                        <img src="assets/img/keep/text.png" onClick={() => this.onChangeInput('text')} /></div>
                    <div className="img-container">
                        <img src="assets/img/keep/image.png" onClick={() => this.onChangeInput('image')} />
                    </div>
                    <div className="img-container">
                        <img src="assets/img/keep/video.png" onClick={() => this.onChangeInput('video')} />
                    </div>
                    <div className="img-container">
                            <img src="assets/img/keep/todo.png" onClick={() => this.onChangeInput('todo')} />
                        </div>
                </div>}

            </form>


        </section>
    }

}


// function DynamicCmp(props) {
//     switch (props.type) {
//         case 'text':
//             return <AddTextNote {...props} />
//         case 'image':
//             return <AddImageNote {...props} />
//     }
// }

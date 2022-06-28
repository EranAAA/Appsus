import { eventBusService } from "../../../services/event-bus-service.js";
import { TodoNote } from "./todo-note.jsx";

const {NavLink} = ReactRouterDOM

export class NotePreview extends React.Component{

    handleInputChange = ({target}) => {
        const color = target.value
        const id = target.name
        this.props.handleColorChange(id, color)
    }

    handleMail = () => {
        const { info } = this.props.note
        // this.props.history.push(`/email/new-email/?${id}`)
        this.props.history.push(`/email/new_email`)
        setTimeout(() => {
            eventBusService.emit('search-keep', info.txt)
        }, 500);
        
    }

    render() {
    const { note, handleRemoveNote, handleChosenNote, handlePinChange} = this.props 
    const pinType = (note.isPinned) ? 'unpin' : 'pin'

    return <section className="note-preview" style={{backgroundColor: note.info.color}}>
        {note.type === 'text' && <pre onClick={()=>handleChosenNote(note)}> {`${note.info.txt}`} </pre>}
        {note.type === 'image' && <img onClick={()=>handleChosenNote(note)} src={note.info.txt}/>}
        {note.type === 'video' && <video src={note.info.txt} controls></video>}
        {note.type === 'todo' && <TodoNote csv={note.info.txt}/>}
        <div className="preview-btns">
            <div onClick={()=>handleRemoveNote(note.id)}  className="preview-btn"> <img src="assets/img/keep/trash.png" alt="" /></div>
            <label >
            <img className="preview-btn" src="assets/img/keep/palette.png" alt=""/>
            <input name={note.id} type="color" hidden onChange={this.handleInputChange}/>
            </label>
            <div onClick={()=>this.handleMail(note.id)} className="preview-btn"> <img src={`assets/img/keep/mail.png`} alt="" /> </div>
            <div onClick={()=>handleChosenNote(note)}  className="preview-btn"> <img src="assets/img/keep/pencil.png" alt="" /></div>
            <div onClick={()=>handlePinChange(note.id)} className="preview-btn"> <img src={`assets/img/keep/${pinType}.png`} alt="" /></div>

            
        </div>
    </section>
    }
}
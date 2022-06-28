import { noteService } from '../apps/keep/services/note.service.js'
import { NoteList } from '../apps/keep/cmps/note-list.jsx'
import { NoteFilter } from '../apps/keep/cmps/note-filter.jsx'
import { AddNote } from '../apps/keep/cmps/add-note.jsx'
import { eventBusService } from '../services/event-bus-service.js'
import { NoteDetails } from '../apps/keep/pages/note-details.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        filterBy: null,
        chosenNote: null,
        searchByKeep: null
    }

    removeEvent;

    componentDidMount() {
        const { filterBy } = this.state
        this.loadNotes()
        console.log(this.props)
        this.removeEvent = eventBusService.on('search-keep', (searchByKeep) => {
            this.setState({ searchByKeep }, () => {
                this.loadNotes()
            })
        })
        this.removeEvent = eventBusService.on('email-toKeep', (emailToKeep) => {
            const msg = `From: ${emailToKeep.from} 
                To: ${emailToKeep.to}  
                Subject: ${emailToKeep.subject} 
                Body: ${emailToKeep.body} `
            this.handleAddNote(msg, 'text')
        })

    }

    componentWillUnmount() {
        this.removeEvent()
    }

    loadNotes() {
        const { filterBy, searchByKeep } = this.state
        noteService.query(filterBy, searchByKeep)
            .then(notes => this.setState({ notes }))

    }

    handleFilterChange = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    handleAddNote = (text, type) => {
        noteService.addNote(text, type)
            .then(this.loadNotes())
    }

    handleRemoveNote = (id) => {
        noteService.removeNote(id)
            .then(this.loadNotes())
    }

    handleColorChange = (id, color) => {
        noteService.changeNoteColor(id, color)
            .then(this.loadNotes())
    }

    handleChosenNote = (note) => {
        this.setState({ chosenNote: note })
    }

    handlePinChange = (id) => {
        noteService.changePin(id)
            .then(this.loadNotes())
    }

    handleTextChange = (id, text) => {
        noteService.changeNoteText(id, text)
            .then(this.loadNotes())
    }

    onGoBack = () => {
        this.setState({ chosenNote: null })
    }

    render() {
        const { notes, chosenNote } = this.state

        return <section className="app-keep">
            <NoteFilter handleFilterChange={this.handleFilterChange} />
            <div className="main-container">
                {chosenNote && <NoteDetails note={chosenNote} onGoBack={this.onGoBack} handleRemoveNote={this.handleRemoveNote} handleColorChange={this.handleColorChange} handlePinChange={this.handlePinChange} handleTextChange={this.handleTextChange} handleChosenNote={this.handleChosenNote}/>}
                {!chosenNote && <React.Fragment>
                    <section className="add-note-container">
                        <AddNote handleAddNote={this.handleAddNote} />
                    </section>
                    <NoteList notes={notes} handleRemoveNote={this.handleRemoveNote} handleColorChange={this.handleColorChange} handleChosenNote={this.handleChosenNote} handlePinChange={this.handlePinChange} history={this.props.history} />
                </React.Fragment>}
            </div>
        </section>
    }

}
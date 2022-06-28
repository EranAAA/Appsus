import { NotePreview } from "./note-preview.jsx"
import { PinnedNotes } from "./pinned-notes.jsx"

export function NoteList({notes, handleRemoveNote, handleColorChange, handleChosenNote, handlePinChange, history, handleTextChange}) {
    const props = {notes, handleRemoveNote, handleColorChange, handleChosenNote, handlePinChange, history}

        return <React.Fragment>
            {notes && <PinnedNotes {...props}/>}
            {notes && <section className="note-list">
                {notes.map(note=><NotePreview key={note.id} note={note} handleRemoveNote={handleRemoveNote} handleColorChange={handleColorChange} handleChosenNote={handleChosenNote} handlePinChange={handlePinChange} handleTextChange={handleTextChange} history={history}/>)}
                </section>}
            </React.Fragment>

}


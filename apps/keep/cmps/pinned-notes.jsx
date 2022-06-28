import { NotePreview } from "./note-preview.jsx"

export function PinnedNotes ({notes, handleRemoveNote, handleColorChange, handleChosenNote, handlePinChange, history}) {
    const pinnedNotes = notes.filter(note => note.isPinned)
    return <section className="pinned-notes">
            {pinnedNotes.map(note=><NotePreview key={note.id} note={note} handleRemoveNote={handleRemoveNote} handleColorChange={handleColorChange} handleChosenNote={handleChosenNote} handlePinChange={handlePinChange} history={history}/>)}
    </section>
}